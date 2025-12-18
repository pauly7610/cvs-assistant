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
    provider: "NP Sarah Johnson",
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
  {
    id: "apt-005",
    date: "Tomorrow",
    time: "2:00 PM",
    location: "CVS MinuteClinic - 789 Park Plaza",
    provider: "NP Michael Brown",
    type: "Scheduled",
  },
  {
    id: "apt-006",
    date: "Tomorrow",
    time: "3:45 PM",
    location: "CVS MinuteClinic - 456 Oak Avenue",
    provider: "Available",
    type: "Walk-in",
  },
  {
    id: "apt-007",
    date: "Wednesday",
    time: "9:30 AM",
    location: "CVS MinuteClinic - 100 Downtown Crossing",
    provider: "NP David Park",
    type: "Scheduled",
  },
  {
    id: "apt-008",
    date: "Wednesday",
    time: "10:45 AM",
    location: "CVS MinuteClinic - 123 Main Street",
    provider: "Available",
    type: "Walk-in",
  },
  {
    id: "apt-009",
    date: "Wednesday",
    time: "1:00 PM",
    location: "CVS MinuteClinic - 789 Park Plaza",
    provider: "NP Lisa Chen",
    type: "Scheduled",
  },
  {
    id: "apt-010",
    date: "Thursday",
    time: "8:00 AM",
    location: "CVS MinuteClinic - 456 Oak Avenue",
    provider: "Available",
    type: "Walk-in",
  },
  {
    id: "apt-011",
    date: "Thursday",
    time: "11:00 AM",
    location: "CVS MinuteClinic - 100 Downtown Crossing",
    provider: "NP Sarah Johnson",
    type: "Scheduled",
  },
  {
    id: "apt-012",
    date: "Thursday",
    time: "3:30 PM",
    location: "CVS MinuteClinic - 123 Main Street",
    provider: "Available",
    type: "Walk-in",
  },
  {
    id: "apt-013",
    date: "Friday",
    time: "9:15 AM",
    location: "CVS MinuteClinic - 789 Park Plaza",
    provider: "NP Michael Brown",
    type: "Scheduled",
  },
  {
    id: "apt-014",
    date: "Friday",
    time: "12:00 PM",
    location: "CVS MinuteClinic - 456 Oak Avenue",
    provider: "Available",
    type: "Walk-in",
  },
  {
    id: "apt-015",
    date: "Friday",
    time: "4:00 PM",
    location: "CVS MinuteClinic - 100 Downtown Crossing",
    provider: "NP David Park",
    type: "Scheduled",
  },
  {
    id: "apt-016",
    date: "Saturday",
    time: "9:00 AM",
    location: "CVS MinuteClinic - 123 Main Street",
    provider: "Available",
    type: "Walk-in",
  },
  {
    id: "apt-017",
    date: "Saturday",
    time: "10:30 AM",
    location: "CVS MinuteClinic - 789 Park Plaza",
    provider: "NP Lisa Chen",
    type: "Scheduled",
  },
  {
    id: "apt-018",
    date: "Saturday",
    time: "1:15 PM",
    location: "CVS MinuteClinic - 456 Oak Avenue",
    provider: "Available",
    type: "Walk-in",
  },
  {
    id: "apt-019",
    date: "Sunday",
    time: "10:00 AM",
    location: "CVS MinuteClinic - 123 Main Street",
    provider: "Available",
    type: "Walk-in",
  },
  {
    id: "apt-020",
    date: "Sunday",
    time: "2:30 PM",
    location: "CVS MinuteClinic - 100 Downtown Crossing",
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
  {
    id: "rx-004",
    name: "Amlodipine",
    dosage: "5mg",
    status: "ready",
    readyTime: "Ready for pickup",
    pharmacy: "CVS Pharmacy #4521 - Main Street",
  },
  {
    id: "rx-005",
    name: "Omeprazole",
    dosage: "20mg",
    status: "ready",
    readyTime: "Ready for pickup",
    pharmacy: "CVS Pharmacy #4521 - Main Street",
  },
  {
    id: "rx-006",
    name: "Levothyroxine",
    dosage: "50mcg",
    status: "processing",
    readyTime: "Ready by 5:00 PM today",
    pharmacy: "CVS Pharmacy #8832 - Oak Avenue",
  },
  {
    id: "rx-007",
    name: "Gabapentin",
    dosage: "300mg",
    status: "ready",
    readyTime: "Ready for pickup",
    pharmacy: "CVS Pharmacy #4521 - Main Street",
  },
  {
    id: "rx-008",
    name: "Hydrochlorothiazide",
    dosage: "25mg",
    status: "ready",
    readyTime: "Ready for pickup",
    pharmacy: "CVS Pharmacy #4521 - Main Street",
  },
  {
    id: "rx-009",
    name: "Sertraline",
    dosage: "50mg",
    status: "processing",
    readyTime: "Ready tomorrow morning",
    pharmacy: "CVS Pharmacy #8832 - Oak Avenue",
  },
  {
    id: "rx-010",
    name: "Losartan",
    dosage: "50mg",
    status: "ready",
    readyTime: "Ready for pickup",
    pharmacy: "CVS Pharmacy #4521 - Main Street",
  },
  {
    id: "rx-011",
    name: "Albuterol Inhaler",
    dosage: "90mcg",
    status: "requires_action",
    readyTime: "Prior authorization needed",
    pharmacy: "CVS Pharmacy #4521 - Main Street",
  },
  {
    id: "rx-012",
    name: "Pantoprazole",
    dosage: "40mg",
    status: "ready",
    readyTime: "Ready for pickup",
    pharmacy: "CVS Pharmacy #8832 - Oak Avenue",
  },
  {
    id: "rx-013",
    name: "Montelukast",
    dosage: "10mg",
    status: "ready",
    readyTime: "Ready for pickup",
    pharmacy: "CVS Pharmacy #4521 - Main Street",
  },
  {
    id: "rx-014",
    name: "Escitalopram",
    dosage: "10mg",
    status: "pending",
    readyTime: "Pending insurance approval",
    pharmacy: "CVS Pharmacy #8832 - Oak Avenue",
  },
  {
    id: "rx-015",
    name: "Prednisone",
    dosage: "10mg",
    status: "ready",
    readyTime: "Ready for pickup",
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
