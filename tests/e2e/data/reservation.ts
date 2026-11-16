/** Values typed into the /reserve form. Strings match what the inputs accept. */
export type ReservationInput = {
  title: string;
  organization: string;
  advisor: string;
  attendance: string;
  purpose: string;
  /** "YYYY-MM-DD" */
  date: string;
  /** "HH:mm", 24h */
  startTime: string;
  /** "HH:mm", 24h */
  endTime: string;
  /** A room id from src/lib/rooms.ts */
  room: string;
};

/**
 * A request that passes every validation rule: a date well clear of the seeded
 * bookings (May 2026), business hours (no after-hours warning), and attendance
 * within the room's capacity (LKD Conference Room A holds 40).
 * Spread and override fields to build variations: `{ ...validReservation, attendance: "500" }`.
 */
export const validReservation: ReservationInput = {
  title: "Playwright Smoke Test Meeting",
  organization: "QA Club",
  advisor: "Dr. Test",
  attendance: "30",
  purpose: "Automated end-to-end check of the reservation flow.",
  date: "2027-03-15",
  startTime: "10:00",
  endTime: "12:00",
  room: "lkd-confa",
};
