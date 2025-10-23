export interface MentorSessionsInterface {
  message: string;
  status: string;
  menteeResources: string;
  feedbackToMentor: string;
  menteeId: string;
  meetingLink: string;
  mentorResources: string;
  ratingToMentor: number;
  feedbackToMentee: string;
  about: string;
  announcement: string;
  mentorId: string;
  updatedAt: UpdatedAt;
  mentorPrivateNotes: string;
  menteePrivateNotes: string;
  slotId: string;
  sharedNotes: string;
  createdAt: UpdatedAt;
  ratingToMentee: number;
  id: string;
  MenteeProfile: MenteeProfile;
  slot: Slot;
}

export interface Slot {
  id: string;
  startAt: string;
  endAt: string;
  createdAt: string;
  status: string;
  bookedBy: string;
  sessionId: string;
}

export interface MenteeProfile {
  createdAt: UpdatedAt;
  uid: string;
  email: string;
  first_name: string;
  last_name: string;
  updatedAt: UpdatedAt;
  country: string;
  roles: string[];
  emailIsVerified: boolean;
  id: string;
}

export interface UpdatedAt {
  type: string;
  seconds: number;
  nanoseconds: number;
}
