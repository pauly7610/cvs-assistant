"use client";

import { useState, useRef, useEffect } from "react";
import { Message, AppointmentSlot, SymptomContext } from "@/types";
import { ChatHeader } from "./chat-header";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { EmergencyModal } from "./emergency-modal";
import { QuickActions } from "./quick-actions";
import { SymptomOptions } from "./symptom-options";
import { TypingIndicator } from "./typing-indicator";
import { sendChatMessage, ApiError } from "@/lib/api-client";
import { isEmergency } from "@/lib/intent-classifier";
import { getAvailableAppointments, getAppointmentById } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: "Hello! I'm your CVS Care Companion. I can help you with:\n\n• **Prescription status** – Check if your medications are ready\n• **Refill requests** – Request prescription refills\n• **MinuteClinic booking** – Schedule a visit\n• **General questions** – Health and pharmacy information\n\nHow can I assist you today?",
  timestamp: new Date(),
};

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [symptomContext, setSymptomContext] = useState<SymptomContext | null>(null);
  const [conversationId, setConversationId] = useState<string | undefined>(undefined);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    if (isEmergency(content)) {
      setShowEmergencyModal(true);
      setIsLoading(false);
      return;
    }

    try {
      const { message: response, isEmergency: emergencyDetected } = await sendChatMessage(content, conversationId);
      
      if (emergencyDetected) {
        setShowEmergencyModal(true);
      }
      
      if (response.intent === "symptom_intake" && !symptomContext) {
        setSymptomContext({ step: "duration", symptom: content });
      }
      
      setMessages((prev) => [...prev, response]);
      if (!conversationId) {
        setConversationId(response.id.split("-")[1]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setLastFailedMessage(content);
      
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : "Something went wrong. Please try again.";
      
      toast.error(errorMessage, {
        duration: 4000,
        action: {
          label: "Retry",
          onClick: () => handleRetry(),
        },
      });
      
      if (error instanceof ApiError && error.code === "UNAUTHORIZED") {
        setMessages((prev) => prev.slice(0, -1));
        return;
      }
      
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastFailedMessage) {
      setLastFailedMessage(null);
      handleSendMessage(lastFailedMessage);
    }
  };

  const handleNotifyRequest = async () => {
    setMessages((prev) => [
      ...prev,
      {
        id: `system-${Date.now()}`,
        role: "assistant",
        content: "Setting up your notification...",
        timestamp: new Date(),
      },
    ]);

    try {
      const response = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prescriptionId: "rx-001",
          prescriptionName: "Lisinopril 10mg",
          pharmacy: "CVS Pharmacy #4521 - Main Street",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [
          ...prev.slice(0, -1),
          {
            id: `system-${Date.now()}`,
            role: "assistant",
            content: "✓ **Notification set!**\n\nI'll send you a text message when your prescription is ready for pickup. You can manage your notifications in your account settings.",
            timestamp: new Date(),
            card: {
              type: "info",
              title: "Notification Active",
              details: {
                Medication: "Lisinopril 10mg",
                Pharmacy: "CVS Pharmacy #4521",
                "Notify when": "Ready for pickup",
              },
            },
          },
        ]);
        toast.success("Notification set successfully!");
      } else {
        throw new Error(data.error);
      }
    } catch {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          id: `system-${Date.now()}`,
          role: "assistant",
          content: "I'll send you a notification when your prescription is ready. You'll receive an SMS at your registered phone number.",
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handlePharmacistEscalation = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: `system-${Date.now()}`,
        role: "assistant",
        content: "I'm connecting you with a CVS pharmacist now.",
        timestamp: new Date(),
        card: {
          type: "info",
          title: "Pharmacist Callback Requested",
          details: {
            Status: "In queue",
            "Estimated wait": "10-15 minutes",
            "Callback number": "Your registered phone",
          },
          actions: [
            { label: "Cancel request", type: "secondary", action: "cancel_pharmacist" },
          ],
        },
      },
    ]);

    toast.success("A pharmacist will call you within 15 minutes.", {
      duration: 5000,
    });

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `system-${Date.now()}`,
          role: "assistant",
          content: "**Update:** Your callback request has been confirmed. A CVS pharmacist will call you at your registered number within the next 15 minutes.\n\nPlease keep your phone nearby. If you miss the call, they'll try again once, then leave a voicemail with instructions to call back.",
          timestamp: new Date(),
        },
      ]);
    }, 2000);
  };

  const handleSymptomDuration = (duration: string) => {
    const durationLabels: Record<string, string> = {
      just_started: "just started",
      few_hours: "a few hours",
      "1_2_days": "1-2 days",
      "3_plus_days": "3+ days",
      over_week: "over a week",
    };

    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: "user",
        content: durationLabels[duration] || duration,
        timestamp: new Date(),
      },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `system-${Date.now()}`,
          role: "assistant",
          content: "Thank you. **How would you rate the severity of your symptoms?**",
          timestamp: new Date(),
        },
      ]);
      setSymptomContext((prev) => prev ? { ...prev, duration, step: "severity" } : null);
    }, 300);
  };

  const handleSymptomSeverity = (severity: string) => {
    const severityLabels: Record<string, string> = {
      mild: "Mild",
      moderate: "Moderate",
      severe: "Severe",
    };

    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: "user",
        content: severityLabels[severity] || severity,
        timestamp: new Date(),
      },
    ]);

    setTimeout(() => {
      const isSevere = severity === "severe";
      const isLongDuration = symptomContext?.duration === "3_plus_days" || symptomContext?.duration === "over_week";

      let recommendation: Message;

      if (isSevere || isLongDuration) {
        recommendation = {
          id: `system-${Date.now()}`,
          role: "assistant",
          content: "Based on your symptoms, I recommend visiting a MinuteClinic for a professional evaluation. Would you like to book an appointment?",
          timestamp: new Date(),
          showAppointments: true,
        };
      } else {
        recommendation = {
          id: `system-${Date.now()}`,
          role: "assistant",
          content: "Based on your symptoms, rest and over-the-counter remedies may help. However, if symptoms persist or worsen, please consider visiting a MinuteClinic.",
          timestamp: new Date(),
          card: {
            type: "info",
            title: "Self-Care Recommendation",
            details: {
              Suggestion: "Rest, stay hydrated, and monitor symptoms",
              "When to seek care": "If symptoms worsen or persist beyond 3 days",
            },
            actions: [
              { label: "Talk to a pharmacist", type: "secondary", action: "pharmacist" },
              { label: "Book MinuteClinic visit", type: "primary", action: "minuteclinic" },
            ],
          },
        };
      }

      setMessages((prev) => [...prev, recommendation]);
      setSymptomContext(null);
    }, 300);
  };

  const handleCardAction = (action: string) => {
    switch (action) {
      case "notify":
        handleNotifyRequest();
        break;
      case "pharmacist":
        handlePharmacistEscalation();
        break;
      case "minuteclinic":
        setMessages((prev) => [
          ...prev,
          {
            id: `system-${Date.now()}`,
            role: "assistant",
            content: "I can help you book a MinuteClinic appointment. Here are the available times near you:",
            timestamp: new Date(),
            showAppointments: true,
          },
        ]);
        break;
      case "directions":
        setMessages((prev) => [
          ...prev,
          {
            id: `system-${Date.now()}`,
            role: "assistant",
            content: "Opening directions to CVS Pharmacy #4521 at Main Street in your maps app.",
            timestamp: new Date(),
          },
        ]);
        break;
      case "cancel_pharmacist":
        setMessages((prev) => [
          ...prev,
          {
            id: `system-${Date.now()}`,
            role: "assistant",
            content: "Your pharmacist callback request has been cancelled. Let me know if you need anything else!",
            timestamp: new Date(),
          },
        ]);
        toast.info("Callback request cancelled.");
        break;
    }
  };

  const handleSelectAppointment = (slotId: string) => {
    const slot = getAppointmentById(slotId);
    if (slot) {
      setMessages((prev) => [
        ...prev,
        {
          id: `system-${Date.now()}`,
          role: "assistant",
          content: `Great choice! I've booked your appointment:\n\n**${slot.date} at ${slot.time}**\n${slot.location}\n\nYou'll receive a confirmation text shortly. Please arrive 10 minutes early and bring your insurance card.`,
          timestamp: new Date(),
          card: {
            type: "appointment",
            title: "Appointment Confirmed",
            details: {
              Date: slot.date,
              Time: slot.time,
              Location: slot.location,
              Type: slot.type,
            },
            actions: [
              { label: "Add to Calendar", type: "primary", action: "calendar" },
              { label: "Get Directions", type: "secondary", action: "directions" },
            ],
          },
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-cvs-surface">
      <ChatHeader />
      
      <main className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <div key={message.id}>
                <ChatMessage
                  message={message}
                  onAction={handleCardAction}
                  appointmentSlots={getAvailableAppointments()}
                  onSelectAppointment={handleSelectAppointment}
                />
                {index === 0 && messages.length === 1 && (
                  <QuickActions onAction={handleSendMessage} />
                )}
              </div>
            ))}
          </AnimatePresence>

          {symptomContext && symptomContext.step === "duration" && (
            <div className="flex justify-start">
              <div className="max-w-[85%] bg-white shadow-card border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                <SymptomOptions type="duration" onSelect={handleSymptomDuration} />
              </div>
            </div>
          )}

          {symptomContext && symptomContext.step === "severity" && (
            <div className="flex justify-start">
              <div className="max-w-[85%] bg-white shadow-card border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                <SymptomOptions type="severity" onSelect={handleSymptomSeverity} />
              </div>
            </div>
          )}

          {isLoading && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>
      </main>

      <div className="max-w-2xl mx-auto w-full">
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>

      <EmergencyModal
        isOpen={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
      />
    </div>
  );
}
