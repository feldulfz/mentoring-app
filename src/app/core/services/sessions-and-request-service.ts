import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, getDoc, query, serverTimestamp, updateDoc, where } from '@angular/fire/firestore';
import { combineLatest, from, map, Observable, of, switchMap } from 'rxjs';
import { UserinfoService } from './userinfo-service';

@Injectable({
  providedIn: 'root'
})
export class SessionsAndRequestService {


  private firestore = inject(Firestore);
  private userinfoService = inject(UserinfoService);

//----------------------UPDATE REQUEST AND SESISON DATA INFO BY ID--------------------------------------------

  //UPDATE REQUEST INFO
  updateRequestInfo(requestId: string, data: Partial<any>) {
    const requestDocRef = doc(
      this.firestore,
      `mentorshipRequests/${requestId}`
    );
    return from(updateDoc(requestDocRef, data));
  }

  //UPDATE SESSION INFOS
  updateSessionInfo(sessionId: string, data: Partial<any>) {
    const requestDocRef = doc(this.firestore, `sessions/${sessionId}`);
    return from(updateDoc(requestDocRef, data));
  }


//----------------------UPDATE REQUEST AND STATUS BY ID--------------------------------------------


  declineMentorshipRequest(requestId: string) {
    const requestDocRef = doc(
      this.firestore,
      `mentorshipRequests/${requestId}`
    );

    return from(
      updateDoc(requestDocRef, {
        status: 'declined',
        updatedAt: new Date(),
      })
    );
  }
  acceptMentorshipRequest(requestId: string) {
    const requestDocRef = doc(
      this.firestore,
      `mentorshipRequests/${requestId}`
    );

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
          ratingToMentee: 0,
          ratingToMentor: 0,
          feedbackToMentee: '',
          feedbackToMentor: '',
          meetingLink: '',
          message: requestData.message,
          mentorPrivateNotes: '',
          menteePrivateNotes: '',
          sharedNotes: '',
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
  deleteMentorshipRequest(requestId: string) {
    const requestDocRef = doc(
      this.firestore,
      `mentorshipRequests/${requestId}`
    );

    return from(deleteDoc(requestDocRef));
  }


//----------------------UPDATE SESSIONS AND REQUEST BY ID--------------------------------------------


  //UPDATE SESSION STATUS
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
  markAsMissedSession(sessionId: string) {
    const requestDocRef = doc(this.firestore, `sessions/${sessionId}`);

    // Update only the status and updatedAt fields
    return from(
      updateDoc(requestDocRef, {
        status: 'missed',
        updatedAt: new Date(),
      })
    );
  }
  markAsCancelledSession(sessionId: string) {
    const requestDocRef = doc(this.firestore, `sessions/${sessionId}`);

    // Update only the status and updatedAt fields
    return from(
      updateDoc(requestDocRef, {
        status: 'cancelled',
        updatedAt: new Date(),
      })
    );
  }



//----------------------GET SESSIONS AND REQUEST BY ID--------------------------------------------

//GET  REQUEST BY ID (full details)
getRequestFullDetailsById(requestId: string): Observable<any | null> {
  const requestDoc = doc(this.firestore, `mentorshipRequests/${requestId}`);

  return docData(requestDoc, { idField: 'id' }).pipe(
    switchMap((request: any | undefined) => {
      if (!request) return of(null);

      const mentee$ = this.userinfoService.getMenteeBasicInfoById(request.menteeId);
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

//GET SESSION BY ID ( full details)
getSessionFullDetailsById(sessiontId: string): Observable<any | null> {
  const sessionDoc = doc(this.firestore, `sessions/${sessiontId}`);

  return docData(sessionDoc, { idField: 'id' }).pipe(
    switchMap((session: any | undefined) => {
      if (!session) return of(null);

      const mentee$ = this.userinfoService.getMenteeBasicInfoById(session.menteeId);
      const slot$ = this.getSlotById(session.mentorId, session.slotId);
      const mentor$ = this.userinfoService.getFullMentorProfileById(session.mentorId);

      return combineLatest([mentee$, mentor$, slot$]).pipe(
        map(([menteeProfile, mentorProfile, slot]) => ({
          ...session,
          menteeProfile,
          mentorProfile,
          slot,
        }))
      );
    })
  );
}



//---------------------------------------------------------------------

  //GET AVAILABILITY INFO
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

}
