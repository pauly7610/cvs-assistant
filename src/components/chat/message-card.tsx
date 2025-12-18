"use client";

import { MessageCard as MessageCardType } from "@/types";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Pill, Calendar, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageCardProps {
  card: MessageCardType;
  onAction?: (action: string) => void;
}

const cardIcons = {
  prescription: Pill,
  appointment: Calendar,
  safety_warning: AlertTriangle,
  info: Info,
};

const cardStyles = {
  prescription: "border-l-4 border-l-cvs-success",
  appointment: "border-l-4 border-l-blue-500",
  safety_warning: "border-l-4 border-l-cvs-red bg-red-50",
  info: "border-l-4 border-l-gray-400",
};

export function MessageCardComponent({ card, onAction }: MessageCardProps) {
  const Icon = cardIcons[card.type];

  return (
    <Card className={cn("mt-3", cardStyles[card.type])}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Icon
            className={cn(
              "h-4 w-4",
              card.type === "safety_warning" ? "text-cvs-red" : "text-gray-600"
            )}
          />
          {card.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <dl className="space-y-1">
          {Object.entries(card.details).map(([key, value]) => (
            <div key={key} className="flex justify-between text-sm">
              <dt className="text-gray-500">{key}</dt>
              <dd className="font-medium text-cvs-text-primary">{value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
      {card.actions && card.actions.length > 0 && (
        <CardFooter>
          {card.actions.map((action) => (
            <Button
              key={action.action}
              variant={action.type === "primary" ? "default" : "secondary"}
              size="sm"
              onClick={() => onAction?.(action.action)}
            >
              {action.label}
            </Button>
          ))}
        </CardFooter>
      )}
    </Card>
  );
}
