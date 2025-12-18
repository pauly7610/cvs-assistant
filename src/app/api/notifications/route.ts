import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createNotification, getUserNotifications, cancelNotification } from "@/lib/db/notifications";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { prescriptionId, prescriptionName, pharmacy, notifyWhen } = body;

    if (!prescriptionId || !prescriptionName || !pharmacy) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const notification = await createNotification(
      userId,
      prescriptionId,
      prescriptionName,
      pharmacy,
      notifyWhen || "ready"
    );

    if (!notification) {
      return NextResponse.json({ error: "Failed to create notification" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      notification,
      message: `We'll notify you when ${prescriptionName} is ready for pickup at ${pharmacy}.`,
    });
  } catch (error) {
    console.error("Notification API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const notifications = await getUserNotifications(userId);

    return NextResponse.json({ notifications });
  } catch (error) {
    console.error("Notification API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const notificationId = searchParams.get("id");

    if (!notificationId) {
      return NextResponse.json({ error: "Notification ID required" }, { status: 400 });
    }

    const success = await cancelNotification(notificationId);

    if (!success) {
      return NextResponse.json({ error: "Failed to cancel notification" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Notification API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
