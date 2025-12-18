import { Intent, Message, MessageCard, Prescription, AppointmentSlot } from "@/types";
import { classifyIntent } from "./intent-classifier";
import { findPrescription, getAllPrescriptions, getAvailableAppointments } from "./mock-data";

const SYSTEM_PROMPT = `You are CVS Care Companion, a healthcare support assistant. You provide information and workflow support, not diagnoses or medical decisions. When uncertain, escalate to a human. Safety overrides helpfulness.`;

function generateId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function createPrescriptionCard(prescription: Prescription): MessageCard {
  const statusLabels: Record<Prescription["status"], string> = {
    ready: "Ready for Pickup",
    processing: "Being Prepared",
    pending: "Pending Approval",
    requires_action: "Action Required",
  };

  return {
    type: "prescription",
    title: `${prescription.name} ${prescription.dosage}`,
    details: {
      Status: statusLabels[prescription.status],
      "Ready Time": prescription.readyTime || "Unknown",
      Location: prescription.pharmacy,
    },
    actions:
      prescription.status === "ready"
        ? [{ label: "Get Directions", type: "secondary", action: "directions" }]
        : [{ label: "Notify me when ready", type: "primary", action: "notify" }],
  };
}

function handlePrescriptionStatus(userMessage: string): { content: string; card?: MessageCard } {
  const prescriptions = getAllPrescriptions();
  const specificRx = findPrescription(userMessage);

  if (specificRx) {
    const statusMessages: Record<Prescription["status"], string> = {
      ready: `Great news! Your ${specificRx.name} prescription is ready for pickup.`,
      processing: `Your ${specificRx.name} prescription is currently being prepared.`,
      pending: `Your ${specificRx.name} prescription is pending doctor approval.`,
      requires_action: `Your ${specificRx.name} prescription requires your attention.`,
    };

    return {
      content: statusMessages[specificRx.status],
      card: createPrescriptionCard(specificRx),
    };
  }

  const readyPrescriptions = prescriptions.filter((rx) => rx.status === "ready");
  const processingPrescriptions = prescriptions.filter((rx) => rx.status !== "ready");

  let content = "Here's the status of your prescriptions:\n\n";

  if (readyPrescriptions.length > 0) {
    content += `**Ready for pickup:** ${readyPrescriptions.map((rx) => rx.name).join(", ")}\n\n`;
  }

  if (processingPrescriptions.length > 0) {
    content += `**In progress:** ${processingPrescriptions.map((rx) => `${rx.name} (${rx.readyTime})`).join(", ")}`;
  }

  return {
    content,
    card: readyPrescriptions[0] ? createPrescriptionCard(readyPrescriptions[0]) : undefined,
  };
}

function handleRefillRequest(userMessage: string): { content: string; card?: MessageCard } {
  const prescription = findPrescription(userMessage);

  if (prescription) {
    return {
      content: `I can help you refill your ${prescription.name} prescription. I've submitted the refill request to your pharmacy.`,
      card: {
        type: "info",
        title: "Refill Request Submitted",
        details: {
          Medication: `${prescription.name} ${prescription.dosage}`,
          Pharmacy: prescription.pharmacy,
          "Estimated Ready": "Within 2-4 hours",
        },
        actions: [
          { label: "Notify me when ready", type: "primary", action: "notify" },
        ],
      },
    };
  }

  return {
    content: "Which prescription would you like to refill? I can see you have the following medications on file:\n\n• Lisinopril 10mg\n• Metformin 500mg\n• Atorvastatin 20mg",
  };
}

function handleSymptomIntake(): { content: string; card?: MessageCard } {
  return {
    content: "I understand you're not feeling well. To help you better, I have a few questions:\n\n**How long have you been experiencing these symptoms?**\n\nPlease note: If your symptoms are severe or you're experiencing a medical emergency, please call 911 or go to your nearest emergency room.",
    card: {
      type: "info",
      title: "Symptom Assessment",
      details: {
        Note: "This is for informational purposes only and not a medical diagnosis.",
      },
      actions: [
        { label: "Talk to a pharmacist", type: "secondary", action: "pharmacist" },
        { label: "Book MinuteClinic visit", type: "primary", action: "minuteclinic" },
      ],
    },
  };
}

function handleOTCQuestion(userMessage: string): { content: string; card?: MessageCard } {
  return {
    content: "I can provide general information about over-the-counter products. However, for personalized recommendations, I'd suggest speaking with one of our pharmacists who can consider your complete health profile.\n\n**Would you like to speak with a pharmacist?**",
    card: {
      type: "info",
      title: "OTC Guidance",
      details: {
        Note: "A pharmacist can provide personalized recommendations based on your health history.",
      },
      actions: [
        { label: "Talk to a pharmacist", type: "primary", action: "pharmacist" },
      ],
    },
  };
}

function handleGeneralHealth(): { content: string; card?: MessageCard } {
  return {
    content: "I can provide general health information and resources. For specific medical advice, I recommend speaking with a healthcare provider.\n\nHow can I help you today?",
    card: {
      type: "info",
      title: "Health Resources",
      details: {
        "MinuteClinic": "Walk-in care for minor illnesses",
        "Pharmacist": "Medication questions and advice",
      },
      actions: [
        { label: "Book MinuteClinic visit", type: "primary", action: "minuteclinic" },
        { label: "Talk to a pharmacist", type: "secondary", action: "pharmacist" },
      ],
    },
  };
}

function handleBookAppointment(): { content: string; card?: MessageCard; showAppointments?: boolean } {
  return {
    content: "I can help you book a MinuteClinic appointment. Here are the available times near you:",
    showAppointments: true,
  };
}

function handleUnknown(): { content: string; card?: MessageCard } {
  return {
    content: "I'm here to help with:\n\n• **Prescription status** – Check if your medications are ready\n• **Refill requests** – Request prescription refills\n• **MinuteClinic booking** – Schedule a visit\n• **General questions** – Health and pharmacy information\n\nHow can I assist you today?",
  };
}

export function generateResponse(userMessage: string): Message & { showAppointments?: boolean } {
  const intent = classifyIntent(userMessage);
  let response: { content: string; card?: MessageCard; showAppointments?: boolean };

  switch (intent) {
    case "emergency":
      response = {
        content: "",
        card: {
          type: "safety_warning",
          title: "Emergency Detected",
          details: {
            Message: "Based on what you've described, you may need immediate medical attention.",
          },
          actions: [],
        },
      };
      break;
    case "prescription_status":
      response = handlePrescriptionStatus(userMessage);
      break;
    case "refill_request":
      response = handleRefillRequest(userMessage);
      break;
    case "symptom_intake":
      response = handleSymptomIntake();
      break;
    case "otc_question":
      response = handleOTCQuestion(userMessage);
      break;
    case "general_health":
      response = handleGeneralHealth();
      break;
    case "book_appointment":
      response = handleBookAppointment();
      break;
    default:
      response = handleUnknown();
  }

  return {
    id: generateId(),
    role: "assistant",
    content: response.content,
    timestamp: new Date(),
    intent,
    card: response.card,
    showAppointments: response.showAppointments,
  };
}
