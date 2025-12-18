"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <div className="max-w-[85%] bg-red-50 border border-red-200 rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-red-800">{message}</p>
            {onRetry && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRetry}
                className="mt-2 text-red-600 hover:text-red-700 hover:bg-red-100 -ml-2"
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                Try again
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
