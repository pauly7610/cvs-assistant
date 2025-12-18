"use client";

import { Message, AppointmentSlot } from "@/types";
import { MessageCardComponent } from "./message-card";
import { AppointmentSlots } from "./appointment-slots";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ChatMessageProps {
  message: Message;
  onAction?: (action: string) => void;
  appointmentSlots?: AppointmentSlot[];
  onSelectAppointment?: (slotId: string) => void;
}

function formatContent(content: string): React.ReactNode {
  const parts = content.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export function ChatMessage({ message, onAction, appointmentSlots, onSelectAppointment }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3",
          isUser
            ? "bg-cvs-surface text-cvs-text-primary rounded-br-md"
            : "bg-white shadow-card border border-gray-100 rounded-bl-md"
        )}
      >
        {message.content && (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {formatContent(message.content)}
          </p>
        )}
        {message.card && (
          <MessageCardComponent card={message.card} onAction={onAction} />
        )}
        {message.showAppointments && appointmentSlots && onSelectAppointment && (
          <AppointmentSlots slots={appointmentSlots} onSelect={onSelectAppointment} />
        )}
      </div>
    </motion.div>
  );
}
