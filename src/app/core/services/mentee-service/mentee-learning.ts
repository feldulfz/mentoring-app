import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, docData, Firestore, query, where} from '@angular/fire/firestore';
import { Observable, combineLatest, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenteeLearning {
  private firestore = inject(Firestore);

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

}
