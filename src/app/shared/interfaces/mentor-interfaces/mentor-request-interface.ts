export interface MentorRequestInterface {
  goal: string;
  slotId: string;
  updatedAt: UpdatedAt;
  status: string;
  createdAt: UpdatedAt;
  menteeId: string;
  mentorId: string;
  message: string;
  attachments: string;
  id: string;
  menteeProfile: MenteeProfile;
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
