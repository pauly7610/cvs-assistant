"use client";

import { Button } from "@/components/ui/button";
import { Pill, Calendar, Stethoscope, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

interface QuickActionsProps {
  onAction: (message: string) => void;
}

const QUICK_ACTIONS = [
  {
    label: "Check Prescriptions",
    message: "Is my prescription ready?",
    icon: Pill,
  },
  {
    label: "Book Appointment",
    message: "I'd like to book a MinuteClinic appointment",
    icon: Calendar,
  },
  {
    label: "Feeling Unwell",
    message: "I'm not feeling well",
    icon: Stethoscope,
  },
  {
    label: "Get Help",
    message: "What can you help me with?",
    icon: HelpCircle,
  },
];

export function QuickActions({ onAction }: QuickActionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 mt-4"
    >
      {QUICK_ACTIONS.map((action, index) => {
        const Icon = action.icon;
        return (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAction(action.message)}
              className="flex items-center gap-2 text-xs w-full sm:w-auto justify-center"
            >
              <Icon className="h-3.5 w-3.5" />
              {action.label}
            </Button>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
