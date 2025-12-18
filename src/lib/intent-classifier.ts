import { Intent } from "@/types";

const ESCALATION_TRIGGERS: Record<string, { response: string; action: string }> = {
  // Agent requests
  "agent": { response: "I understand you'd like to speak with someone directly. I can connect you with a CVS pharmacist who can help. Would you like me to request a callback?", action: "offer_callback" },
  "representative": { response: "I'd be happy to connect you with a CVS team member. Would you prefer to speak with a pharmacist, or would you like the MinuteClinic number?", action: "offer_callback" },
  "human": { response: "I can arrange for a CVS pharmacist to call you back within 15 minutes. Would that work for you?", action: "offer_callback" },
  "real person": { response: "Absolutely, I can connect you with our pharmacy team. Shall I request a callback?", action: "offer_callback" },
  "talk to someone": { response: "Of course! I can connect you with a CVS pharmacist. Would you like a callback?", action: "offer_callback" },
  "speak to someone": { response: "I'd be glad to help you reach our team. Would you like to speak with a pharmacist?", action: "offer_callback" },
  "live agent": { response: "I can connect you with our pharmacy team right away. Would you like me to request a callback?", action: "offer_callback" },
  "transfer": { response: "I can transfer you to a CVS pharmacist. They typically call back within 10-15 minutes.", action: "offer_callback" },
  "manager": { response: "I can connect you with our pharmacy team who can address your concerns. Would that help?", action: "offer_callback" },
  "supervisor": { response: "I can escalate your concern to our pharmacy team. Would you like a callback?", action: "offer_callback" },
  // Frustration
  "this is useless": { response: "I'm sorry I haven't been able to help. Let me connect you with a CVS pharmacist who can assist you directly.", action: "offer_callback" },
  "you're not helping": { response: "I apologize for the frustration. Would you like to speak with a pharmacist?", action: "offer_callback" },
  "useless bot": { response: "I understand your frustration. A CVS pharmacist can help you directly - would you like a callback?", action: "offer_callback" },
  "stupid bot": { response: "I'm sorry I couldn't help. Let me connect you with our pharmacy team.", action: "offer_callback" },
  "doesn't work": { response: "I apologize for the difficulty. Would you like a pharmacist callback?", action: "offer_callback" },
  // Spam/Test
  "test": { response: "I'm here and ready to help! Ask me about prescriptions, appointments, or health questions.", action: "respond" },
  "asdf": { response: "I didn't quite catch that. How can I help you today?", action: "respond" },
  "aaaa": { response: "I'm here to help! What can I assist you with?", action: "respond" },
  "lol": { response: "I'm here whenever you're ready! What can I help with?", action: "respond" },
  // Inappropriate
  "shut up": { response: "I'm here to help with your healthcare needs. Is there something I can assist you with?", action: "respond" },
  "go away": { response: "If you need help later with prescriptions or appointments, I'll be here.", action: "respond" },
};

export function checkEscalationTrigger(input: string): { response: string; action: string } | null {
  const normalizedInput = input.toLowerCase().trim();
  
  for (const [trigger, data] of Object.entries(ESCALATION_TRIGGERS)) {
    if (normalizedInput === trigger || normalizedInput.includes(trigger)) {
      return data;
    }
  }
  return null;
}

const EMERGENCY_KEYWORDS = [
  "chest pain",
  "trouble breathing",
  "can't breathe",
  "stroke",
  "severe bleeding",
  "heart attack",
  "unconscious",
  "seizure",
  "overdose",
  "suicidal",
  "suicide",
];

const INTENT_PATTERNS: Record<Intent, RegExp[]> = {
  prescription_status: [
    /prescription.*(?:status|ready|pick up)/i,
    /(?:is|are).*(?:ready|available)/i,
    /when.*(?:ready|pick up)/i,
    /check.*(?:prescription|rx|medication)/i,
    /(?:my|the).*(?:prescription|rx|medication)/i,
  ],
  refill_request: [
    /refill/i,
    /renew.*prescription/i,
    /need.*more/i,
    /running.*(?:out|low)/i,
    /order.*(?:again|more)/i,
  ],
  symptom_intake: [
    /(?:i|my).*(?:feel|feeling|have|having)/i,
    /symptoms?/i,
    /(?:headache|fever|cough|cold|flu|pain|ache|sore)/i,
    /(?:sick|unwell|ill)/i,
    /what.*wrong/i,
  ],
  otc_question: [
    /over.*counter/i,
    /otc/i,
    /(?:recommend|suggest).*(?:medicine|medication|drug)/i,
    /what.*(?:take|use).*for/i,
    /(?:tylenol|advil|ibuprofen|aspirin|benadryl)/i,
  ],
  general_health: [
    /(?:how|what).*(?:health|healthy)/i,
    /(?:diet|exercise|sleep|vitamin)/i,
    /(?:advice|tip|information)/i,
  ],
  book_appointment: [
    /(?:book|schedule|make).*(?:appointment|visit)/i,
    /minuteclinic/i,
    /(?:see|visit).*(?:doctor|nurse|provider)/i,
    /walk.?in/i,
    /(?:available|open).*(?:time|slot|appointment)/i,
  ],
  medication_info: [
    /(?:what|how).*(?:medication|medicine|drug).*(?:do|work|for)/i,
    /(?:side effects?|interactions?)/i,
    /(?:tell|explain).*(?:about|medication)/i,
    /(?:my|current).*medications?/i,
    /what.*medications?.*(?:taking|on)/i,
  ],
  log_symptom: [
    /(?:log|record|track).*(?:symptom|how.*feel)/i,
    /(?:add|save).*(?:symptom|health)/i,
    /(?:i.*want.*to|let.*me).*(?:log|record|track)/i,
  ],
  log_vital: [
    /(?:log|record|track).*(?:blood pressure|weight|glucose|temperature|heart rate|oxygen)/i,
    /(?:my|today's?).*(?:blood pressure|weight|glucose|bp)/i,
    /(?:add|save).*(?:vital|reading|measurement)/i,
  ],
  adherence_check: [
    /(?:did|have).*(?:take|took).*(?:medication|medicine|pill)/i,
    /(?:medication|medicine).*(?:adherence|compliance|tracking)/i,
    /(?:missed|skip|forget).*(?:dose|medication|medicine)/i,
    /(?:remind|reminder).*(?:medication|medicine|pill)/i,
  ],
  appointment_history: [
    /(?:past|previous|history).*appointment/i,
    /(?:my|show).*(?:appointment|visit).*(?:history|past)/i,
    /(?:upcoming|scheduled|next).*(?:appointment|visit)/i,
  ],
  health_summary: [
    /(?:my|show).*(?:health|medical).*(?:summary|overview|profile)/i,
    /(?:what.*you.*know|tell.*me).*about.*(?:my.*health|me)/i,
    /(?:health|medical).*(?:record|history|info)/i,
  ],
  emergency: [],
  unknown: [],
};

export function classifyIntent(input: string): Intent {
  const normalizedInput = input.toLowerCase().trim();

  for (const keyword of EMERGENCY_KEYWORDS) {
    if (normalizedInput.includes(keyword)) {
      return "emergency";
    }
  }

  for (const [intent, patterns] of Object.entries(INTENT_PATTERNS)) {
    if (intent === "emergency" || intent === "unknown") continue;
    for (const pattern of patterns) {
      if (pattern.test(normalizedInput)) {
        return intent as Intent;
      }
    }
  }

  return "unknown";
}

export function isEmergency(input: string): boolean {
  const normalizedInput = input.toLowerCase().trim();
  return EMERGENCY_KEYWORDS.some((keyword) => normalizedInput.includes(keyword));
}
