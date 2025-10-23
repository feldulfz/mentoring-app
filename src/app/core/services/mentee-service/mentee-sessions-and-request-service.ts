import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { UserinfoService } from '../userinfo-service';
import { combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { MenteeSessionsInterface } from '../../../shared/interfaces/mentee-interfaces/mentee-sessions-interface';
import { MenteeRequestInterface } from '../../../shared/interfaces/mentee-interfaces/mentee-request-interface';


@Injectable({
  providedIn: 'root'
})
export class MenteeSessionsAndRequestService {
  private firestore = inject(Firestore);
  private userinfoService = inject(UserinfoService);


  //GET ALL REQUEST BY STATUS FILTER
  getAllMentorsRequestByStatus(menteeId: string, status: string): Observable<MenteeRequestInterface[]> {
      return this.getMentorshipRequestsWithMentorInfo(menteeId).pipe(
        map(requests => requests.filter(req => req.status === status))
      );
  }
  //GET ALL SESSIONS BY STATUS FILTER
  getAllMenteeSessionsByStatus(mentorId: string, status: string): Observable<MenteeSessionsInterface[]> {

      if (status === 'completed'){
        return this.getMenteeSessionsWithMentorInfo(mentorId).pipe(
          map(requests => requests.filter((s) => s.status === 'completed' && (s.ratingToMentor == 0 && s.feedbackToMentor == '')))
        );
      }else if(status === 'reviewed'){
        return this.getMenteeSessionsWithMentorInfo(mentorId).pipe(
          map(requests => requests.filter((s) => s.status === 'completed' && (s.ratingToMentor !== 0 || s.feedbackToMentor !== '')))
        );
      }else{
      return this.getMenteeSessionsWithMentorInfo(mentorId).pipe(
        map(requests => requests.filter(req => req.status === status))
      );
    }

  }

















  //GET ALL REQUEST (w/ Mentor Full Info)
  getMentorshipRequestsWithMentorInfo(menteeId: string): Observable<any[]> {
    return this.getRequestsByMenteeId(menteeId).pipe(
      switchMap((requests) => {
        if (!requests.length) return of([]);

        const enrichedRequests$ = requests.map((request: any) => {
          // const mentor$ = this.getMentorProfileById(request.mentorId);
          const mentor$ = this.userinfoService.getFullMentorProfileById(request.mentorId);
          const slot$ = this.userinfoService.getSlotById(request.mentorId, request.slotId);

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

  //GET ALL SESSIONS(w/ Mentor Full Info)
  getMenteeSessionsWithMentorInfo(menteeId: string): Observable<any[]> {
    return this.getSessionsByMenteeId(menteeId).pipe(
      switchMap((sessions) => {
        if (!sessions.length) return of([]);

        const enrichedSessions$ = sessions.map((session: any) => {
          const mentor$ = this.userinfoService.getFullMentorProfileById(session.mentorId);
          const slot$ = this.userinfoService.getSlotById(session.mentorId, session.slotId);

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

  //GET ALL REQUEST (no Mentor Info)
  getRequestsByMenteeId(menteeId: string): Observable<any[]> {
    const requestsRef = collection(this.firestore, 'mentorshipRequests');
    const q = query(requestsRef, where('menteeId', '==', menteeId));
    return collectionData(q, { idField: 'id' });
  }

  //GET ALL SESSION (no Mentor Info)
  getSessionsByMenteeId(menteeId: string): Observable<any[]> {
    const requestsRef = collection(this.firestore, 'sessions');
    const q = query(requestsRef, where('menteeId', '==', menteeId));
    return collectionData(q, { idField: 'id' });
  }


}
