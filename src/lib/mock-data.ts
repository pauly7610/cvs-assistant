import { Prescription, AppointmentSlot } from "@/types";

export const MOCK_APPOINTMENT_SLOTS: AppointmentSlot[] = [
  {
    id: "apt-001",
    date: "Today",
    time: "2:30 PM",
    location: "CVS MinuteClinic - 123 Main Street",
    provider: "Available",
    type: "Walk-in",
  },
  {
    id: "apt-002",
    date: "Today",
    time: "4:15 PM",
    location: "CVS MinuteClinic - 123 Main Street",
    provider: "Available",
    type: "Walk-in",
  },
  {
    id: "apt-003",
    date: "Tomorrow",
    time: "9:00 AM",
    location: "CVS MinuteClinic - 456 Oak Avenue",
    provider: "Dr. Sarah Chen",
    type: "Scheduled",
  },
  {
    id: "apt-004",
    date: "Tomorrow",
    time: "11:30 AM",
    location: "CVS MinuteClinic - 123 Main Street",
    provider: "Available",
    type: "Walk-in",
  },
];

export const MOCK_PRESCRIPTIONS: Prescription[] = [
  {
    id: "rx-001",
    name: "Lisinopril",
    dosage: "10mg",
    status: "ready",
    readyTime: "Ready for pickup",
    pharmacy: "CVS Pharmacy #4521 - Main Street",
  },
  {
    id: "rx-002",
    name: "Metformin",
    dosage: "500mg",
    status: "processing",
    readyTime: "Ready by 3:00 PM today",
    pharmacy: "CVS Pharmacy #4521 - Main Street",
  },
  {
    id: "rx-003",
    name: "Atorvastatin",
    dosage: "20mg",
    status: "pending",
    readyTime: "Pending doctor approval",
    pharmacy: "CVS Pharmacy #4521 - Main Street",
  },
];

export function findPrescription(query: string): Prescription | undefined {
  const normalizedQuery = query.toLowerCase();
  return MOCK_PRESCRIPTIONS.find(
    (rx) =>
      rx.name.toLowerCase().includes(normalizedQuery) ||
      normalizedQuery.includes(rx.name.toLowerCase())
  );
}

export function getAllPrescriptions(): Prescription[] {
  return MOCK_PRESCRIPTIONS;
}

export function getAvailableAppointments(): AppointmentSlot[] {
  return MOCK_APPOINTMENT_SLOTS;
}

export function getAppointmentById(id: string): AppointmentSlot | undefined {
  return MOCK_APPOINTMENT_SLOTS.find((apt) => apt.id === id);
}
