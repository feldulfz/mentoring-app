import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';

export interface MentorshipRequest {
  requestId: string;
  menteeId: string;
  mentorId: string;
  slotId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled' | 'completed';
  goal: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private firestore = inject(Firestore);

  private collectionSession = 'sessions';

  // Mock mentorship request data
  private mentorshipRequests: any[] = [
    {
      requestId: 'req_001',
      menteeId: 'mentee_abc123',
      mentorId: 'mentor_xyz789',
      slotId: 'slot_20251015_0900',
      status: 'pending',
      goal: 'Improve front-end development skills',
      message: 'I’d like to learn how to build scalable Angular applications.',
      createdAt: new Date('2025-10-10T09:00:00Z'),
      updatedAt: new Date('2025-10-10T09:00:00Z')
    },
    {
      requestId: 'req_002',
      menteeId: 'mentee_def456',
      mentorId: 'mentor_xyz789',
      slotId: 'slot_20251016_1500',
      status: 'accepted',
      goal: 'Learn backend fundamentals',
      message: 'I want to understand how APIs connect with front-end apps.',
      createdAt: new Date('2025-10-08T14:30:00Z'),
      updatedAt: new Date('2025-10-11T10:15:00Z')
    },
    {
      requestId: 'req_003',
      menteeId: 'mentee_ghi789',
      mentorId: 'mentor_qwe456',
      slotId: 'slot_20251012_1100',
      status: 'rejected',
      goal: 'Career guidance in software engineering',
      message: 'Looking for help in planning my career path in tech.',
      createdAt: new Date('2025-10-05T08:45:00Z'),
      updatedAt: new Date('2025-10-06T09:00:00Z')
    },
    {
      requestId: 'req_004',
      menteeId: 'mentee_jkl321',
      mentorId: 'mentor_qwe456',
      slotId: 'slot_20251020_1300',
      status: 'completed',
      goal: 'Portfolio review and feedback',
      message: 'I’d appreciate feedback on my project portfolio.',
      createdAt: new Date('2025-09-25T12:00:00Z'),
      updatedAt: new Date('2025-10-01T17:30:00Z')
    },
    {
      requestId: 'req_005',
      menteeId: 'mentee_mno654',
      mentorId: 'mentor_xyz789',
      slotId: 'slot_20251018_1600',
      status: 'cancelled',
      goal: 'Time management and productivity',
      message: 'Had to cancel due to schedule conflict, will rebook later.',
      createdAt: new Date('2025-10-02T09:10:00Z'),
      updatedAt: new Date('2025-10-03T08:00:00Z')
    }
  ];


  getAllsessions(){
    const itemsCollection = collection(this.firestore, this.collectionSession);
    return collectionData(itemsCollection, { idField: "id" });
  }


  // Return all mentorship requests
  getAllRequests(): any[] {
    return this.mentorshipRequests;
  }

  // Get a single request by ID
  getRequestById(requestId: string): any {
    return this.mentorshipRequests.find(req => req.requestId === requestId);
  }

  // Filter by status (e.g., accepted, pending)
  getRequestsByStatus(status: any['status']): any[] {
    return this.mentorshipRequests.filter(req => req.status === status);
  }
}
