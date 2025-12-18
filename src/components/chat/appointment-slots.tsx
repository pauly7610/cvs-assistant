"use client";

import { AppointmentSlot } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AppointmentSlotsProps {
  slots: AppointmentSlot[];
  onSelect: (slotId: string) => void;
}

export function AppointmentSlots({ slots, onSelect }: AppointmentSlotsProps) {
  return (
    <div className="mt-3 space-y-2">
      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
        Available Appointments
      </p>
      <div className="space-y-2">
        {slots.slice(0, 3).map((slot, index) => (
          <motion.div
            key={slot.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={cn(
                "cursor-pointer transition-all hover:shadow-card-hover hover:border-cvs-red/30",
                "border-l-4",
                slot.type === "Walk-in" ? "border-l-cvs-success" : "border-l-blue-500"
              )}
              onClick={() => onSelect(slot.id)}
            >
              <CardContent className="p-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Calendar className="h-3.5 w-3.5 text-gray-500" />
                      <span>{slot.date}</span>
                      <Clock className="h-3.5 w-3.5 text-gray-500 ml-2" />
                      <span>{slot.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>{slot.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        slot.type === "Walk-in"
                          ? "bg-green-100 text-cvs-success"
                          : "bg-blue-100 text-blue-600"
                      )}
                    >
                      {slot.type}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <Button variant="ghost" size="sm" className="w-full text-cvs-red">
        View more times
      </Button>
    </div>
  );
}
