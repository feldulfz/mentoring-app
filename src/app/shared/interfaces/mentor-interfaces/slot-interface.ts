export interface Slot {
  id?: string; // only use from return value in fetch data
  startAt: Date | string; // from form
  endAt: Date | string; // from form
  createdAt: Date | string; // put in service use serverTimestamp
  updatedAt: Date | string;  // put in service use serverTimestamp
  status: string; // put in service
  bookedBy: string; // update when booked by mentee
  sessionId: string; // update when session is created ?
  recurring: boolean; // not use
}
