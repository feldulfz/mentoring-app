import { inject, Injectable } from '@angular/core';
import { Firestore, doc, collection, query, where, collectionData, docData } from '@angular/fire/firestore';
import { combineLatest, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private firestore = inject(Firestore);

  // GET USERS INFO
  getUserByUid(uid: string): Observable<any> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    return docData(userDocRef, { idField: 'id' });
  }

  // GET MENTOR PROFILE BY ID
  getMentorProfileByUid(uid: string): Observable<any> {
    const mentorDocRef = doc(this.firestore, `mentorProfiles/${uid}`);
    return docData(mentorDocRef, { idField: 'id' });
  }

  // GET MENTOR FULL INFO
  getFullMentorData(uid: string): Observable<any> {
    return this.getUserByUid(uid).pipe(
      switchMap((user) =>
        this.getMentorProfileByUid(uid).pipe(
          map((mentorProfile) => ({
            ...user,
            mentorProfile,
          }))
        )
      )
    );
  }

  // GET ALL MENTOR PROFILE
  getAllMentorProfiles(): Observable<any> {
    const mentorColRef = collection(this.firestore, 'mentorProfiles');
    return collectionData(mentorColRef, { idField: 'id' });
  }

  // GET ALL UPCOMING SESSION
  getUpcomingSessions(mentorId: string): Observable<any> {
    const sessionsRef = collection(this.firestore, 'sessions');
    const q = query(sessionsRef, where('status', '==', 'upcoming'), where('mentorId', '==', mentorId));

    return collectionData(q, { idField: 'id' }).pipe(
      switchMap((sessions: any[]) => {
        if (!sessions.length) return of([]);

        const sessionsWithDetails$ = sessions.map((session) =>
          combineLatest([
            this.getUserByUid(session.menteeId), // get mentee user info
            this.getSlotById(session.mentorId, session.slotId), // get slot info
          ]).pipe(
            map(([menteeUser, slot]) => ({
              ...session,
              mentee: menteeUser,
              slot,
            }))
          )
        );

        return combineLatest(sessionsWithDetails$);
      })
    );
  }

  // GET ALL COMPLETED RATED SESSIONS
  getCompletedRatedSessions(mentorId: string): Observable<any> {
    const sessionsRef = collection(this.firestore, 'sessions');
    const q = query(
      sessionsRef,
      where('status', '==', 'completed'),
      where('mentorId', '==', mentorId)
    );

    return collectionData(q, { idField: 'id' }).pipe(
      map((sessions: any[]) =>
        sessions.filter(
          (session) =>
            session.ratingToMentor !== 0 ||
            (session.feedbackToMentor && session.feedbackToMentor.trim() !== '')
        )
      ),
      switchMap((filteredSessions) => {
        if (!filteredSessions.length) return of([]);

        const sessionsWithMentee$ = filteredSessions.map((session) =>
          combineLatest([
            this.getUserByUid(session.menteeId),
            this.getSlotById(session.mentorId, session.slotId),
          ]).pipe(
            map(([menteeUser, slot]) => ({
              ...session,
              mentee: menteeUser,
              slot,
            }))
          )
        );

        return combineLatest(sessionsWithMentee$);
      })
    );
  }

  //GET MENTOR STATS
  getMentorStats(mentorId: string): Observable<{
    totalCompletedSessions: number;
    averageRating: number;
    uniqueMentees: number;
    totalFeedbackGiven: number;
  }> {
    const sessionsRef = collection(this.firestore, 'sessions');

    const q = query(
      sessionsRef,
      where('mentorId', '==', mentorId),
      where('status', '==', 'completed')
    );

    return collectionData(q, { idField: 'id' }).pipe(
      map((sessions: any[]) => {
        if (!sessions.length) {
          return {
            totalCompletedSessions: 0,
            averageRating: 0,
            uniqueMentees: 0,
            totalFeedbackGiven: 0,
          };
        }

        const totalCompletedSessions = sessions.length;

        const totalRating = sessions.reduce(
          (sum, s) => sum + (s.ratingToMentor || 0),
          0
        );
        const averageRating = totalRating / totalCompletedSessions;

        const menteeIds = new Set(sessions.map((s) => s.menteeId));
        const uniqueMentees = menteeIds.size;

        const totalFeedbackGiven = sessions.filter(
          (s) => s.feedbackToMentor?.trim() !== ''
        ).length;

        return {
          totalCompletedSessions,
          averageRating: Number(averageRating.toFixed(2)),
          uniqueMentees,
          totalFeedbackGiven,
        };
      })
    );
  }


  //GET SLOT BY ID
  getSlotById(mentorId: string, slotId: string): Observable<any | null> {
    const slotDocRef = doc(
      this.firestore,
      `mentorProfiles/${mentorId}/availability/${slotId}`
    );

    return docData(slotDocRef, { idField: 'id' }).pipe(
      map((slot: any) => {
        if (!slot) return null;

        return {
          id: slot.id,
          startAt: slot.startAt?.toDate?.().toISOString() ?? null,
          endAt: slot.endAt?.toDate?.().toISOString() ?? null,
          createdAt: slot.createdAt?.toDate?.().toISOString() ?? null,
          status: slot.status ?? 'available',
          bookedBy: slot.bookedBy ?? null,
          sessionId: slot.sessionId ?? null,
        };
      })
    );
  }


}
