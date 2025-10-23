import { inject, Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, docData, Firestore, getDoc, query, serverTimestamp, updateDoc, where } from '@angular/fire/firestore';
import { combineLatest, from, map, Observable, of, switchMap } from 'rxjs';
import { UserinfoService } from '../userinfo-service';
import { MentorSessionsInterface } from '../../../shared/interfaces/mentor-interfaces/mentor-sessions-interface';
import { MentorRequestInterface } from '../../../shared/interfaces/mentor-interfaces/mentor-request-interface';


@Injectable({
  providedIn: 'root'
})
export class MentorSessionsAndRequest {
  private firestore = inject(Firestore);
  private userinfoService = inject(UserinfoService);

  //MENTOR REQUEST NO FILTER
  getAllMentorshipRequestsWithMenteeInfo(mentorId: string): Observable<any[]> {
    return this.getRequestsByMentorId(mentorId).pipe(
      switchMap((requests) => {
        if (!requests.length) return of([]);

        const enrichedRequests$ = requests.map((request: any) => {
          const mentee$ = this.userinfoService.getMenteeBasicInfoById(request.menteeId);
          const slot$ = this.getSlotById(request.mentorId, request.slotId);

          return combineLatest([mentee$, slot$]).pipe(
            map(([menteeProfile, slot]) => ({
              ...request,
              menteeProfile,
              slot,
            }))
          );
        });

        return combineLatest(enrichedRequests$);
      })
    );
  }
  //MENTOR SESSIONS NO FILTER
  getAllMentorSessionWithMenteeInfo(mentorId: string): Observable<any[]> {
    return this.getSessionsByMentorId(mentorId).pipe(
      switchMap((sessions) => {
        if (!sessions.length) return of([]);

        const enrichedSessions$ = sessions.map((session: any) => {
          const mentee$ = this.userinfoService.getMenteeBasicInfoById(session.menteeId);
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



  //GET ALL FILTERED MENTOR SESSIONS AND REQUESTS BY STATUS
  getAllMentorsRequestByStatus(mentorId: string, status: string): Observable<MentorRequestInterface[]> {
      return this.getAllMentorshipRequestsWithMenteeInfo(mentorId).pipe(
        map(requests => requests.filter(req => req.status === status))
      );
  }
  getAllMentorsSessionsByStatus(mentorId: string, status: string): Observable<MentorSessionsInterface[]> {

      if (status === 'completed'){
        return this.getAllMentorSessionWithMenteeInfo(mentorId).pipe(
          map(requests => requests.filter((s) => s.status === 'completed' && (s.ratingToMentee == 0 && s.feedbackToMentee == '')))
        );
      }else if(status === 'reviewed'){
        return this.getAllMentorSessionWithMenteeInfo(mentorId).pipe(
          map(requests => requests.filter((s) => s.status === 'completed' && (s.ratingToMentee !== 0 || s.feedbackToMentee !== '')))
        );
      }else{
      return this.getAllMentorSessionWithMenteeInfo(mentorId).pipe(
        map(requests => requests.filter(req => req.status === status))
      );
    }

  }



//---------------------------------------------------------------------

  //GET REQUEST RAW DATA (No Mentee and Mentor Profile )
  getRequestsByMentorId(mentorId: string): Observable<any[]> {
    const requestsRef = collection(this.firestore, 'mentorshipRequests');
    const q = query(requestsRef, where('mentorId', '==', mentorId));
    return collectionData(q, { idField: 'id' });
  }

  //GET SESSION RAW DATA (No Mentee and Mentor Profile )
  getSessionsByMentorId(mentorId: string): Observable<any[]> {
    const requestsRef = collection(this.firestore, 'sessions');
    const q = query(requestsRef, where('mentorId', '==', mentorId));
    return collectionData(q, { idField: 'id' });
  }

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
