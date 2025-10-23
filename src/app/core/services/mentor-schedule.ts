import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, Firestore, query, serverTimestamp, where, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable, combineLatest, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MentorSchedule {
  private firestore = inject(Firestore);

  async createSlot(mentorId: string, slot: any): Promise<void> {
    const slotsRef = collection(this.firestore, `mentorProfiles/${mentorId}/availability`);

    const { startAt, endAt, bookedBy, sessionId, recurring } = slot;

    const newSlot = {
      startAt: startAt,
      endAt: endAt,
      status: 'available',
      recurring: recurring,
      bookedBy: bookedBy,
      sessionId: sessionId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await addDoc(slotsRef, newSlot);
  }

  async updateSlot(mentorId: string, slotId: string, updatedData: Partial<any>): Promise<void> {
    const slotRef = doc(this.firestore, `mentorProfiles/${mentorId}/availability/${slotId}`);
    
    const dataToUpdate = {
      ...updatedData,
      updatedAt: serverTimestamp(),
    };
    await updateDoc(slotRef, dataToUpdate);    
  }

  async deleteSlot(mentorId: string, slotId: string): Promise<void> {
    const slotDocRef = doc(this.firestore, `mentorProfiles/${mentorId}/availability/${slotId}`);
    await deleteDoc(slotDocRef);
  }

  getAllSlotById(mentorId: string): Observable<any[]> {
    const slotsRef = collection(this.firestore, `mentorProfiles/${mentorId}/availability`);
    return collectionData(slotsRef, { idField: 'id' }).pipe(
      map((slots: any[]) =>
        slots.map((slot) => ({
          id: slot.id,
          startAt: slot.startAt?.toDate?.() ?? null,
          endAt: slot.endAt?.toDate?.() ?? null,
          createdAt: slot.createdAt?.toDate?.() ?? null,
          status: slot.status ?? 'available',
          bookedBy: slot.bookedBy ?? null,
          sessionId: slot.sessionId ?? null,
          recurring: slot.recurring ?? false
        }))
      )
    );
  }

  //--------------------------------------------------------------------
  // Not use

  getMentorProfileById(mentorId: string): Observable<any> {
    const itemDoc = doc(this.firestore, `mentorProfiles/${mentorId}`);
    return docData(itemDoc, { idField: "id" });
  }

  getRequestsByMenteeId(menteeId: string): Observable<any[]> {
    const requestsRef = collection(this.firestore, 'mentorshipRequests');
    const q = query(requestsRef, where('menteeId', '==', menteeId));
    return collectionData(q, { idField: 'id' });
  }  

  getSlotById(mentorId: string, slotId: string): Observable<any | null> {
    const slotDoc = doc(this.firestore, `mentorProfiles/${mentorId}/availability/${slotId}`);
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

  getMentorshipRequestsWithMentorInfo(menteeId: string): Observable<any[]> {
    return this.getRequestsByMenteeId(menteeId).pipe(
      switchMap((requests) => {
        if (!requests.length) return of([]);

        const enrichedRequests$ = requests.map((request: any) => {
          const mentor$ = this.getMentorProfileById(request.mentorId);
          const slot$ = this.getSlotById(request.mentorId, request.slotId);

          // Combine mentor and slot into one object
          return combineLatest([mentor$, slot$]).pipe(
            map(([mentorProfile, slot]) => ({
              ...request,
              mentorProfile,
              slot
            }))
          );
        });

        // Wait for all requests to resolve
        return combineLatest(enrichedRequests$);
      })
    );
  }

  getSessionsByMenteeId(menteeId: string): Observable<any[]> {
    const requestsRef = collection(this.firestore, 'sessions');
    const q = query(requestsRef, where('menteeId', '==', menteeId));
    return collectionData(q, { idField: 'id' });
  }

  getMenteeSessionsWithMentorInfo(menteeId: string): Observable<any[]> {
    return this.getSessionsByMenteeId(menteeId).pipe(
      switchMap((sessions) => {
        if (!sessions.length) return of([]);

        const enrichedSessions$ = sessions.map((session: any) => {
          const mentor$ = this.getMentorProfileById(session.mentorId);
          const slot$ = this.getSlotById(session.mentorId, session.slotId);

          // Combine mentor and slot into one object
          return combineLatest([mentor$, slot$]).pipe(
            map(([mentorProfile, slot]) => ({
              ...session,
              mentorProfile,
              slot
            }))
          );
        });

        // Wait for all sessions to resolve
        return combineLatest(enrichedSessions$);
      })
    );
  }

  //--------------------------------------
  // getAllSlotById(mentorId: string): Observable<any[]> {
  //   const slotsRef = collection(this.firestore, `mentorProfiles/${mentorId}/availability`);
  //   return collectionData(slotsRef, { idField: 'id' }).pipe(
  //     map((slots: any[]) =>
  //       slots.map((slot) => ({
  //         id: slot.id,
  //         startAt: slot.startAt?.toDate?.().toISOString() ?? null,
  //         endAt: slot.endAt?.toDate?.().toISOString() ?? null,
  //         createdAt: slot.createdAt?.toDate?.().toISOString() ?? null,
  //         status: slot.status ?? 'available',
  //         bookedBy: slot.bookedBy ?? null,
  //         sessionId: slot.sessionId ?? null,
  //       }))
  //     )
  //   );
  // }
  //--------------------------------------  
  //--------------------------------------------------------------------
}
