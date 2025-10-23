export interface MenteeSessionsInterface {
  ratingToMentee: number | string;
  about: string;
  slotId: string;
  menteeId: string;
  menteeResources: string;
  mentorResources: string;
  sharedNotes: string;
  menteePrivateNotes: string;
  feedbackToMentee: string;
  ratingToMentor: number | string;
  mentorPrivateNotes: string;
  status: string;
  announcement: string;
  meetingLink: string;
  updatedAt: UpdatedAt;
  mentorId: string;
  message: string;
  feedbackToMentor: string;
  createdAt: UpdatedAt;
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
  updatedAt: UpdatedAt;
  first_name: string;
  createdAt: UpdatedAt;
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

export interface UpdatedAt {
  type: string;
  seconds: number;
  nanoseconds: number;
}
