export type Intent =
  | "prescription_status"
  | "refill_request"
  | "symptom_intake"
  | "otc_question"
  | "general_health"
  | "book_appointment"
  | "emergency"
  | "unknown"
  | "medication_info"
  | "log_symptom"
  | "log_vital"
  | "adherence_check"
  | "appointment_history"
  | "health_summary";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  intent?: Intent;
  card?: MessageCard;
  showAppointments?: boolean;
}

export interface MessageCard {
  type: "prescription" | "appointment" | "safety_warning" | "info";
  title: string;
  details: Record<string, string>;
  actions?: CardAction[];
}

export interface CardAction {
  label: string;
  type: "primary" | "secondary";
  action: string;
}

export interface Prescription {
  id: string;
  name: string;
  dosage: string;
  status: "ready" | "processing" | "pending" | "requires_action";
  readyTime?: string;
  pharmacy: string;
}

export interface Conversation {
  id: string;
  userId: string;
  messages: Message[];
  intent?: Intent;
  escalated: boolean;
  createdAt: Date;
}

export interface AppointmentSlot {
  id: string;
  date: string;
  time: string;
  location: string;
  provider: string;
  type: "Walk-in" | "Scheduled";
}

export interface SymptomContext {
  symptom?: string;
  duration?: string;
  severity?: string;
  step: "initial" | "duration" | "severity" | "complete";
}

export interface PatientProfile {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  memberId: string;
  pharmacyLocation: string;
}

export interface SymptomLog {
  id: string;
  userId: string;
  symptom: string;
  severity: number;
  duration?: string;
  notes?: string;
  loggedAt: Date;
}

export interface Vital {
  id: string;
  userId: string;
  type: "blood_pressure" | "weight" | "glucose" | "temperature" | "heart_rate" | "oxygen";
  value: Record<string, number>;
  unit: string;
  notes?: string;
  measuredAt: Date;
}

export interface Medication {
  id: string;
  userId: string;
  name: string;
  dosage: string;
  frequency: string;
  instructions?: string;
  prescriber?: string;
  pharmacy?: string;
  refillsRemaining: number;
  lastFilled?: Date;
  nextRefillDate?: Date;
  isActive: boolean;
}

export interface MedicationReminder {
  id: string;
  medicationId: string;
  userId: string;
  reminderTime: string;
  daysOfWeek: number[];
  isEnabled: boolean;
}

export interface MedicationAdherence {
  id: string;
  medicationId: string;
  userId: string;
  scheduledTime: Date;
  takenAt?: Date;
  status: "taken" | "missed" | "skipped" | "pending";
  notes?: string;
}

export interface Appointment {
  id: string;
  userId: string;
  location: string;
  locationAddress?: string;
  appointmentType: string;
  provider?: string;
  scheduledAt: Date;
  durationMinutes: number;
  status: "scheduled" | "completed" | "cancelled" | "no_show";
  notes?: string;
}

export interface UserPreferences {
  id: string;
  userId: string;
  preferredPharmacy?: string;
  preferredCommunication: string;
  notificationEnabled: boolean;
  reminderTimePreference: string;
  language: string;
  accessibilitySettings: Record<string, unknown>;
}

export interface HealthCondition {
  id: string;
  userId: string;
  conditionName: string;
  diagnosedDate?: Date;
  status: "active" | "managed" | "resolved";
  notes?: string;
}

export interface Allergy {
  id: string;
  userId: string;
  allergen: string;
  severity?: "mild" | "moderate" | "severe";
  reaction?: string;
}

export interface UserHealthContext {
  conditions: HealthCondition[];
  allergies: Allergy[];
  medications: Medication[];
  recentSymptoms: SymptomLog[];
  preferences: UserPreferences | null;
}
