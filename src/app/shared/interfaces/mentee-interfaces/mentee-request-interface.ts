export interface MenteeRequestInterface {
  goal: string;
  status: string;
  slotId: string;
  createdAt: CreatedAt;
  menteeId: string;
  attachments: string;
  mentorId: string;
  updatedAt: CreatedAt;
  message: string;
  id: string;
  mentorProfile: MentorProfile;
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

export interface MentorProfile {
  last_name: string;
  roles: string[];
  email: string;
  uid: string;
  updatedAt: CreatedAt;
  first_name: string;
  createdAt: CreatedAt;
  country: string;
  emailIsVerified: boolean;
  id: string;
  professional_years_experience: number;
  website: string;
  searchTokens: string[];
  expertise: string[];
  education: string;
  school: string;
  industries: string[];
  linkedIn: string;
  skills: string[];
  company: string;
  current_job: string;
  bio: string;
}

export interface CreatedAt {
  type: string;
  seconds: number;
  nanoseconds: number;
}
