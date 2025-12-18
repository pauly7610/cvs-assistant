"use client";

import { useState, FormEvent, KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 p-4 bg-white border-t border-gray-100">
      <div className="flex-1 relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={disabled}
          rows={1}
          className={cn(
            "w-full resize-none rounded-xl border border-gray-200 bg-cvs-surface px-4 py-3 text-sm",
            "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cvs-red focus:border-transparent",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "min-h-[48px] max-h-[120px]"
          )}
          style={{ height: "48px" }}
        />
      </div>
      <Button
        type="submit"
        size="icon"
        disabled={!input.trim() || disabled}
        className="h-12 w-12 rounded-xl shrink-0"
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
}
