import { Intent } from "@/types";

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
