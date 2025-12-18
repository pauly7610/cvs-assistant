import { getServiceClient } from "@/lib/supabase";
import { Medication, MedicationReminder, MedicationAdherence } from "@/types";

export async function getUserMedications(userId: string, activeOnly = true): Promise<Medication[]> {
  const supabase = getServiceClient();

  let query = supabase
    .from("medications")
    .select()
    .eq("user_id", userId);

  if (activeOnly) {
    query = query.eq("is_active", true);
  }

  const { data, error } = await query.order("name");

  if (error) {
    console.error("Error fetching medications:", error);
    return [];
  }

  return (data || []).map((m) => ({
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
  }));
}

export async function getMedicationReminders(userId: string): Promise<MedicationReminder[]> {
  const supabase = getServiceClient();

  const { data, error } = await supabase
    .from("medication_reminders")
    .select(`
      *,
      medications(name, dosage)
    `)
    .eq("user_id", userId)
    .eq("is_enabled", true);

  if (error) {
    console.error("Error fetching reminders:", error);
    return [];
  }

  return (data || []).map((r) => ({
    id: r.id,
    medicationId: r.medication_id,
    userId: r.user_id,
    reminderTime: r.reminder_time,
    daysOfWeek: r.days_of_week,
    isEnabled: r.is_enabled,
  }));
}

export async function recordAdherence(
  medicationId: string,
  userId: string,
  scheduledTime: Date,
  status: MedicationAdherence["status"],
  takenAt?: Date,
  notes?: string
): Promise<MedicationAdherence | null> {
  const supabase = getServiceClient();

  const { data, error } = await supabase
    .from("medication_adherence")
    .insert({
      medication_id: medicationId,
      user_id: userId,
      scheduled_time: scheduledTime.toISOString(),
      taken_at: takenAt?.toISOString(),
      status,
      notes,
    })
    .select()
    .single();

  if (error) {
    console.error("Error recording adherence:", error);
    return null;
  }

  return {
    id: data.id,
    medicationId: data.medication_id,
    userId: data.user_id,
    scheduledTime: new Date(data.scheduled_time),
    takenAt: data.taken_at ? new Date(data.taken_at) : undefined,
    status: data.status,
    notes: data.notes,
  };
}

export async function getAdherenceStats(userId: string, days = 30): Promise<{
  taken: number;
  missed: number;
  skipped: number;
  adherenceRate: number;
}> {
  const supabase = getServiceClient();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from("medication_adherence")
    .select("status")
    .eq("user_id", userId)
    .gte("scheduled_time", startDate.toISOString());

  if (error || !data) {
    return { taken: 0, missed: 0, skipped: 0, adherenceRate: 0 };
  }

  const stats = data.reduce(
    (acc, { status }) => {
      if (status === "taken") acc.taken++;
      else if (status === "missed") acc.missed++;
      else if (status === "skipped") acc.skipped++;
      return acc;
    },
    { taken: 0, missed: 0, skipped: 0 }
  );

  const total = stats.taken + stats.missed;
  const adherenceRate = total > 0 ? Math.round((stats.taken / total) * 100) : 100;

  return { ...stats, adherenceRate };
}

export async function getMedicationsNeedingRefill(userId: string, daysAhead = 7): Promise<Medication[]> {
  const supabase = getServiceClient();
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + daysAhead);

  const { data, error } = await supabase
    .from("medications")
    .select()
    .eq("user_id", userId)
    .eq("is_active", true)
    .lte("next_refill_date", futureDate.toISOString().split("T")[0]);

  if (error) {
    console.error("Error fetching medications needing refill:", error);
    return [];
  }

  return (data || []).map((m) => ({
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
  }));
}
