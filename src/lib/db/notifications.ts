import { getServiceClient } from "@/lib/supabase";

export interface PrescriptionNotification {
  id: string;
  userId: string;
  prescriptionId: string;
  prescriptionName: string;
  pharmacy: string;
  notifyWhen: "ready" | "reminder";
  status: "pending" | "sent" | "cancelled";
  createdAt: Date;
}

export async function createNotification(
  userId: string,
  prescriptionId: string,
  prescriptionName: string,
  pharmacy: string,
  notifyWhen: "ready" | "reminder" = "ready"
): Promise<PrescriptionNotification | null> {
  const supabase = getServiceClient();

  const { data, error } = await supabase
    .from("prescription_notifications")
    .insert({
      user_id: userId,
      prescription_id: prescriptionId,
      prescription_name: prescriptionName,
      pharmacy,
      notify_when: notifyWhen,
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating notification:", error);
    return null;
  }

  return {
    id: data.id,
    userId: data.user_id,
    prescriptionId: data.prescription_id,
    prescriptionName: data.prescription_name,
    pharmacy: data.pharmacy,
    notifyWhen: data.notify_when,
    status: data.status,
    createdAt: new Date(data.created_at),
  };
}

export async function getUserNotifications(userId: string): Promise<PrescriptionNotification[]> {
  const supabase = getServiceClient();

  const { data, error } = await supabase
    .from("prescription_notifications")
    .select()
    .eq("user_id", userId)
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }

  return (data || []).map((n) => ({
    id: n.id,
    userId: n.user_id,
    prescriptionId: n.prescription_id,
    prescriptionName: n.prescription_name,
    pharmacy: n.pharmacy,
    notifyWhen: n.notify_when,
    status: n.status,
    createdAt: new Date(n.created_at),
  }));
}

export async function cancelNotification(notificationId: string): Promise<boolean> {
  const supabase = getServiceClient();

  const { error } = await supabase
    .from("prescription_notifications")
    .update({ status: "cancelled" })
    .eq("id", notificationId);

  if (error) {
    console.error("Error cancelling notification:", error);
    return false;
  }

  return true;
}
