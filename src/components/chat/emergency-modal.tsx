"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmergencyModal({ isOpen, onClose }: EmergencyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 mx-auto max-w-md"
          >
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="bg-cvs-red p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6 text-white" />
                    <h2 className="text-lg font-semibold text-white">
                      Emergency Detected
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-white/80 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <p className="text-cvs-text-primary mb-4">
                  Based on what you&apos;ve described, you may need{" "}
                  <strong>immediate medical attention</strong>.
                </p>
                <p className="text-gray-600 text-sm mb-6">
                  I&apos;m not able to provide emergency medical assistance. Please
                  contact emergency services or go to your nearest emergency
                  room.
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:911"
                    className="flex items-center justify-center gap-2 w-full bg-cvs-red text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    Call 911
                  </a>
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={onClose}
                  >
                    I understand, continue chatting
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
