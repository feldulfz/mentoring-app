import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  getDoc,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { combineLatest, from, map, Observable, of, switchMap } from 'rxjs';
import { MenteeProfile } from '../../features/mentee/containers/mentee-profile/mentee-profile';

@Injectable({
  providedIn: 'root',
})
export class MentorSessionsService {
  private firestore = inject(Firestore);

  getRequestsByMentorId(mentorId: string): Observable<any[]> {
    const requestsRef = collection(this.firestore, 'mentorshipRequests');
    const q = query(requestsRef, where('mentorId', '==', mentorId));
    return collectionData(q, { idField: 'id' });
  }

  getMentorProfileById(mentorId: string): Observable<any> {
    const itemDoc = doc(this.firestore, `mentorProfiles/${mentorId}`);
    return docData(itemDoc, { idField: 'id' });
  }

  getMenteeProfileById(menteeId: string): Observable<any> {
    const menteeDocRef = doc(this.firestore, `users/${menteeId}`);
    return docData(menteeDocRef, { idField: 'id' });
  }

  getSlotById(mentorId: string, slotId: string): Observable<any | null> {
    const slotDoc = doc(
      this.firestore,
      `mentorProfiles/${mentorId}/availability/${slotId}`
    );
    return docData(slotDoc, { idField: 'id' }).pipe(
      map((slot: any) => {
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

  getSessionsByMentorId(mentorId: string): Observable<any[]> {
    const requestsRef = collection(this.firestore, 'sessions');
    const q = query(requestsRef, where('mentorId', '==', mentorId));
    return collectionData(q, { idField: 'id' });
  }

  //GET ALL DATA IN REQUEST
  getMentorshipRequestsWithMenteeInfo(mentorId: string): Observable<any[]> {
    return this.getRequestsByMentorId(mentorId).pipe(
      switchMap((requests) => {
        if (!requests.length) return of([]);

        const enrichedRequests$ = requests.map((request: any) => {
          const mentee$ = this.getMenteeProfileById(request.menteeId);
          const slot$ = this.getSlotById(request.mentorId, request.slotId);

          // Combine mentor and slot into one object
          return combineLatest([mentee$, slot$]).pipe(
            map(([menteeProfile, slot]) => ({
              ...request,
              menteeProfile,
              slot,
            }))
          );
        });

        // Wait for all requests to resolve
        return combineLatest(enrichedRequests$);
      })
    );
  }

  //GET ALL DATA IN SESSION
  getMentorSessionWithMenteeInfo(mentorId: string): Observable<any[]> {
    return this.getSessionsByMentorId(mentorId).pipe(
      switchMap((sessions) => {
        if (!sessions.length) return of([]);

        const enrichedSessions$ = sessions.map((session: any) => {
          const mentee$ = this.getMenteeProfileById(session.menteeId);
          const slotId$ = this.getSlotById(session.mentorId, session.slotId);

          return combineLatest([mentee$, slotId$]).pipe(
            map(([MenteeProfile, slot]) => ({
              ...session,
              MenteeProfile,
              slot,
            }))
          );
        });

        return combineLatest(enrichedSessions$);
      })
    );
  }

  getMentorshipRequestById(requestId: string): Observable<any | null> {
    const requestDoc = doc(this.firestore, `mentorshipRequests/${requestId}`);

    return docData(requestDoc, { idField: 'id' }).pipe(
      switchMap((request: any | undefined) => {
        if (!request) return of(null);

        const mentee$ = this.getMenteeProfileById(request.menteeId);
        const slot$ = this.getSlotById(request.mentorId, request.slotId);

        return combineLatest([mentee$, slot$]).pipe(
          map(([menteeProfile, slot]) => ({
            ...request,
            menteeProfile,
            slot,
          }))
        );
      })
    );
  }

  getMentorshipSessionById(sessiontId: string): Observable<any | null> {
    const sessionDoc = doc(this.firestore, `sessions/${sessiontId}`);

    return docData(sessionDoc, { idField: 'id' }).pipe(
      switchMap((session: any | undefined) => {
        if (!session) return of(null);

        const mentee$ = this.getMenteeProfileById(session.menteeId);
        const slot$ = this.getSlotById(session.mentorId, session.slotId);
        const requestInfo$ = this.getRequestsByMentorId(session.mentorId);
        const mentor$ = this.getMentorProfileById(session.mentorId);

        return combineLatest([mentee$, mentor$, slot$, requestInfo$]).pipe(
          map(([menteeProfile, mentorProfile, slot, requestInfo]) => ({
            ...session,
            menteeProfile,
            mentorProfile,
            slot,
            requestInfo,
          }))
        );
      })
    );
  }

  //UPDATE MENTORSHIP REQUEST
  updateMentorshipRequest(requestId: string, data: Partial<any>) {
  const requestDocRef = doc(this.firestore, `mentorshipRequests/${requestId}`);
  return from(updateDoc(requestDocRef, data));
}

//UPDATE REQUEST STATUS
declineMentorshipRequest(requestId: string) {
  const requestDocRef = doc(this.firestore, `mentorshipRequests/${requestId}`);

  // Update only the status and updatedAt fields
  return from(
    updateDoc(requestDocRef, {
      status: 'rejected',
      updatedAt: new Date(),
    })
  );
}


acceptMentorshipRequest(requestId: string) {
  const requestDocRef = doc(this.firestore, `mentorshipRequests/${requestId}`);

  return from(getDoc(requestDocRef)).pipe(
    switchMap(async (snapshot) => {
      if (!snapshot.exists()) throw new Error('Request not found');

      const requestData: any = snapshot.data();

      await updateDoc(requestDocRef, {
        status: 'accepted',
        updatedAt: serverTimestamp(),
      });

      const newSession = {
        mentorId: requestData.mentorId,
        menteeId: requestData.menteeId,
        slotId: requestData.slotId,
        about: requestData.goal ?? '',
        status: 'upcoming',
        sessionRating: 0,
        ratingToMentee: 0,
        feedbackToMentee: '',
        ratingToMentor: 0,
        feedbackToMentor: '',
        mentorRating: 0,
        meetingLink: '',
        message: requestData.message,
        mentorPrivateNotes: '',
        menteePrivateNotes: '',
        sharedNotes: '',
        feedback: '',
        mentorResources: '',
        menteeResources: '',
        announcement: '',
        createdAt: serverTimestamp(),
      };

      const sessionRef = await addDoc(
        collection(this.firestore, 'sessions'),
        newSession
      );

      // Update slot status (optional)
      const slotRef = doc(
        this.firestore,
        `mentorProfiles/${requestData.mentorId}/availability/${requestData.slotId}`
      );

      await updateDoc(slotRef, {
        status: 'booked',
        bookedBy: requestData.menteeId,
        sessionId: sessionRef.id,
      });

      return sessionRef.id;
    })
  );
}


//UPDATE SESSION STATUS

markAsCompletedSessions(sessionId: string) {
  const requestDocRef = doc(this.firestore, `sessions/${sessionId}`);

  // Update only the status and updatedAt fields
  return from(
    updateDoc(requestDocRef, {
      status: 'completed',
      updatedAt: new Date(),
    })
  );
}

markAsMissedSessions(sessionId: string) {
  const requestDocRef = doc(this.firestore, `sessions/${sessionId}`);

  // Update only the status and updatedAt fields
  return from(
    updateDoc(requestDocRef, {
      status: 'missed',
      updatedAt: new Date(),
    })
  );
}



cancelMentorshipSession(sessionId: string) {
  const requestDocRef = doc(this.firestore, `sessions/${sessionId}`);

  // Update only the status and updatedAt fields
  return from(
    updateDoc(requestDocRef, {
      status: 'cancelled',
      updatedAt: new Date(),
    })
  );
}



//UPDATE SESSION INFOS

updateMentorSessionInfo(sessionId: string, data: Partial<any>) {
  const requestDocRef = doc(this.firestore, `sessions/${sessionId}`);
  return from(updateDoc(requestDocRef, data));
}



markAsCompletedSession(sessiontId: string) {
  const requestDocRef = doc(this.firestore, `sessions/${sessiontId}`);

  // Update only the status and updatedAt fields
  return from(
    updateDoc(requestDocRef, {
      status: 'completed',
      updatedAt: new Date(),
    })
  );
}





}
