import { getServiceClient } from "@/lib/supabase";
import { Appointment } from "@/types";

export async function createAppointment(
  userId: string,
  location: string,
  appointmentType: string,
  scheduledAt: Date,
  locationAddress?: string,
  provider?: string,
  durationMinutes = 15,
  notes?: string,
  conversationId?: string
): Promise<Appointment | null> {
  const supabase = getServiceClient();

  const { data, error } = await supabase
    .from("appointments")
    .insert({
      user_id: userId,
      location,
      location_address: locationAddress,
      appointment_type: appointmentType,
      provider,
      scheduled_at: scheduledAt.toISOString(),
      duration_minutes: durationMinutes,
      status: "scheduled",
      notes,
      conversation_id: conversationId,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating appointment:", error);
    return null;
  }

  return mapAppointment(data);
}

export async function getUpcomingAppointments(userId: string, limit = 5): Promise<Appointment[]> {
  const supabase = getServiceClient();

  const { data, error } = await supabase
    .from("appointments")
    .select()
    .eq("user_id", userId)
    .eq("status", "scheduled")
    .gte("scheduled_at", new Date().toISOString())
    .order("scheduled_at", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }

  return (data || []).map(mapAppointment);
}

export async function getAppointmentHistory(userId: string, limit = 10): Promise<Appointment[]> {
  const supabase = getServiceClient();

  const { data, error } = await supabase
    .from("appointments")
    .select()
    .eq("user_id", userId)
    .in("status", ["completed", "cancelled", "no_show"])
    .order("scheduled_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching appointment history:", error);
    return [];
  }

  return (data || []).map(mapAppointment);
}

export async function updateAppointmentStatus(
  appointmentId: string,
  status: Appointment["status"]
): Promise<boolean> {
  const supabase = getServiceClient();

  const { error } = await supabase
    .from("appointments")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", appointmentId);

  if (error) {
    console.error("Error updating appointment:", error);
    return false;
  }

  return true;
}

export async function cancelAppointment(appointmentId: string): Promise<boolean> {
  return updateAppointmentStatus(appointmentId, "cancelled");
}

function mapAppointment(data: Record<string, unknown>): Appointment {
  return {
    id: data.id as string,
    userId: data.user_id as string,
    location: data.location as string,
    locationAddress: data.location_address as string | undefined,
    appointmentType: data.appointment_type as string,
    provider: data.provider as string | undefined,
    scheduledAt: new Date(data.scheduled_at as string),
    durationMinutes: data.duration_minutes as number,
    status: data.status as Appointment["status"],
    notes: data.notes as string | undefined,
  };
}
