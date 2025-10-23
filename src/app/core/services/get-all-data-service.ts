import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  collection,
  collectionData,
  docData,
} from '@angular/fire/firestore';
import { combineLatest, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetAllDataService {
  private firestore = inject(Firestore);

  getAllMentors(): Observable<any[]> {
    const mentorColRef = collection(this.firestore, 'mentorProfiles');
    return collectionData(mentorColRef, { idField: 'id' }).pipe(
      switchMap((mentorProfiles: any[]) => {
        if (!mentorProfiles.length) return of([]);
        const mentors$ = mentorProfiles.map((mentor) =>
          this.getUserByUid(mentor.uid).pipe(
            map((user) => ({
              ...user,
              ...mentor,
            }))
          )
        );
        return combineLatest(mentors$);
      })
    );
  }

  getAllMentees(): Observable<any[]> {
    const usersColRef = collection(this.firestore, 'users');
    return collectionData(usersColRef, { idField: 'id' }).pipe(
      map((users: any[]) =>
        users.filter((user) => !user.roles?.includes('mentor'))
      )
    );
  }

  getUserByUid(uid: string): Observable<any | null> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    return docData(userDocRef, { idField: 'id' });
  }

  getMentorProfileByUid(uid: string): Observable<any | null> {
    const mentorDocRef = doc(this.firestore, `mentorProfiles/${uid}`);
    return docData(mentorDocRef, { idField: 'id' });
  }

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
          startAt: slot.startAt?.toDate?.()?.toISOString() ?? null,
          endAt: slot.endAt?.toDate?.()?.toISOString() ?? null,
          status: slot.status ?? 'available',
          bookedBy: slot.bookedBy ?? null,
          sessionId: slot.sessionId ?? null,
        };
      })
    );
  }

  getAllCompletedRatedSessions(): Observable<any[]> {
    const sessionsColRef = collection(this.firestore, 'sessions');
    return collectionData(sessionsColRef, { idField: 'id' }).pipe(
      map((sessions: any[]) =>
        sessions.filter(
          (s) =>
            s.status === 'completed' &&
            (s.ratingToMentor !== 0 ||
              (s.feedbackToMentor && s.feedbackToMentor.trim() !== ''))
        )
      ),
      switchMap((filteredSessions) => {
        if (!filteredSessions.length) return of([]);

        const enrichedSessions$ = filteredSessions.map((session) => {
          const mentee$ = this.getUserByUid(session.menteeId);
          const mentor$ = this.getMentorProfileByUid(session.mentorId);
          const slot$ = this.getSlotById(session.mentorId, session.slotId);

          return combineLatest([mentee$, mentor$, slot$]).pipe(
            map(([mentee, mentorProfile, slot]) => ({
              ...session,
              mentee,
              mentorProfile,
              slot,
            }))
          );
        });

        return combineLatest(enrichedSessions$);
      })
    );
  }
}
