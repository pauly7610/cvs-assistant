import { getServiceClient } from "@/lib/supabase";
import { SymptomLog, Vital, HealthCondition, Allergy, UserHealthContext } from "@/types";

export async function logSymptom(
  userId: string,
  symptom: string,
  severity: number,
  duration?: string,
  notes?: string,
  conversationId?: string
): Promise<SymptomLog | null> {
  const supabase = getServiceClient();

  const { data, error } = await supabase
    .from("symptom_logs")
    .insert({
      user_id: userId,
      symptom,
      severity,
      duration,
      notes,
      conversation_id: conversationId,
    })
    .select()
    .single();

  if (error) {
    console.error("Error logging symptom:", error);
    return null;
  }

  return {
    id: data.id,
    userId: data.user_id,
    symptom: data.symptom,
    severity: data.severity,
    duration: data.duration,
    notes: data.notes,
    loggedAt: new Date(data.logged_at),
  };
}

export async function getRecentSymptoms(userId: string, limit = 10): Promise<SymptomLog[]> {
  const supabase = getServiceClient();

  const { data, error } = await supabase
    .from("symptom_logs")
    .select()
    .eq("user_id", userId)
    .order("logged_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching symptoms:", error);
    return [];
  }

  return (data || []).map((d) => ({
    id: d.id,
    userId: d.user_id,
    symptom: d.symptom,
    severity: d.severity,
    duration: d.duration,
    notes: d.notes,
    loggedAt: new Date(d.logged_at),
  }));
}

export async function logVital(
  userId: string,
  type: Vital["type"],
  value: Record<string, number>,
  unit: string,
  notes?: string
): Promise<Vital | null> {
  const supabase = getServiceClient();

  const { data, error } = await supabase
    .from("vitals")
    .insert({
      user_id: userId,
      type,
      value,
      unit,
      notes,
    })
    .select()
    .single();

  if (error) {
    console.error("Error logging vital:", error);
    return null;
  }

  return {
    id: data.id,
    userId: data.user_id,
    type: data.type,
    value: data.value,
    unit: data.unit,
    notes: data.notes,
    measuredAt: new Date(data.measured_at),
  };
}

export async function getHealthConditions(userId: string): Promise<HealthCondition[]> {
  const supabase = getServiceClient();

  const { data, error } = await supabase
    .from("health_conditions")
    .select()
    .eq("user_id", userId)
    .eq("status", "active");

  if (error) {
    console.error("Error fetching conditions:", error);
    return [];
  }

  return (data || []).map((d) => ({
    id: d.id,
    userId: d.user_id,
    conditionName: d.condition_name,
    diagnosedDate: d.diagnosed_date ? new Date(d.diagnosed_date) : undefined,
    status: d.status,
    notes: d.notes,
  }));
}

export async function getAllergies(userId: string): Promise<Allergy[]> {
  const supabase = getServiceClient();

  const { data, error } = await supabase
    .from("allergies")
    .select()
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching allergies:", error);
    return [];
  }

  return (data || []).map((d) => ({
    id: d.id,
    userId: d.user_id,
    allergen: d.allergen,
    severity: d.severity,
    reaction: d.reaction,
  }));
}

export async function getUserHealthContext(userId: string): Promise<UserHealthContext> {
  const [conditions, allergies, recentSymptoms] = await Promise.all([
    getHealthConditions(userId),
    getAllergies(userId),
    getRecentSymptoms(userId, 5),
  ]);

  const supabase = getServiceClient();
  const { data: meds } = await supabase
    .from("medications")
    .select()
    .eq("user_id", userId)
    .eq("is_active", true);

  const { data: prefs } = await supabase
    .from("user_preferences")
    .select()
    .eq("user_id", userId)
    .single();

  return {
    conditions,
    allergies,
    medications: (meds || []).map((m) => ({
      id: m.id,
      userId: m.user_id,
      name: m.name,
      dosage: m.dosage,
      frequency: m.frequency,
      instructions: m.instructions,
      prescriber: m.prescriber,
      pharmacy: m.pharmacy,
      refillsRemaining: m.refills_remaining,
      lastFilled: m.last_filled ? new Date(m.last_filled) : undefined,
      nextRefillDate: m.next_refill_date ? new Date(m.next_refill_date) : undefined,
      isActive: m.is_active,
    })),
    recentSymptoms,
    preferences: prefs ? {
      id: prefs.id,
      userId: prefs.user_id,
      preferredPharmacy: prefs.preferred_pharmacy,
      preferredCommunication: prefs.preferred_communication,
      notificationEnabled: prefs.notification_enabled,
      reminderTimePreference: prefs.reminder_time_preference,
      language: prefs.language,
      accessibilitySettings: prefs.accessibility_settings,
    } : null,
  };
}
