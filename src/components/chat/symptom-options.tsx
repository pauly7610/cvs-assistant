"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface SymptomOptionsProps {
  type: "duration" | "severity";
  onSelect: (value: string) => void;
}

const DURATION_OPTIONS = [
  { label: "Just started", value: "just_started" },
  { label: "A few hours", value: "few_hours" },
  { label: "1-2 days", value: "1_2_days" },
  { label: "3+ days", value: "3_plus_days" },
  { label: "Over a week", value: "over_week" },
];

const SEVERITY_OPTIONS = [
  { label: "Mild", value: "mild", color: "bg-green-100 text-cvs-success border-green-200" },
  { label: "Moderate", value: "moderate", color: "bg-yellow-100 text-cvs-warning border-yellow-200" },
  { label: "Severe", value: "severe", color: "bg-red-100 text-cvs-red border-red-200" },
];

export function SymptomOptions({ type, onSelect }: SymptomOptionsProps) {
  const options = type === "duration" ? DURATION_OPTIONS : SEVERITY_OPTIONS;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-2 mt-3"
    >
      {options.map((option, index) => (
        <motion.div
          key={option.value}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelect(option.value)}
            className={`text-xs ${"color" in option ? option.color : ""}`}
          >
            {option.label}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
}
