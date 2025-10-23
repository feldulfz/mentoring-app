import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, docData, Firestore, query, serverTimestamp, where, writeBatch } from '@angular/fire/firestore';
import { combineLatest, from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {


  private firestore = inject(Firestore);




  //GET
  getFullMentorProfileById(mentorId: string): Observable<any> {
    const mentorProfile$ = this.getMentorBasicInfoById(mentorId);
    const userProfileDoc = doc(this.firestore, `users/${mentorId}`);
    const userProfile$ = docData(userProfileDoc, { idField: 'id' });

    return combineLatest([userProfile$, mentorProfile$]).pipe(
      map(([user, mentorProfile]) => ({
        ...user,
        ...mentorProfile,
      }))
    );
  }

  getMenteeBasicInfoById(menteeId: string): Observable<any> {
    const menteeDocRef = doc(this.firestore, `users/${menteeId}`);
    return docData(menteeDocRef, { idField: 'id' });
  }























  //UPDATE MENTOR PROFILE AND MENTOR USER INFO
  updateMentorProfile(uid: string, data: any): Observable<void> {
    const batch = writeBatch(this.firestore);

    const userRef = doc(this.firestore, `users/${uid}`);
    const mentorRef = doc(this.firestore, `mentorProfiles/${uid}`);

    const userFields: any = {
      first_name: data.first_name,
      last_name: data.last_name,
      country: data.country,
      updatedAt: serverTimestamp(),
    };

    const mentorFields: any = {
      bio: data.bio,
      company: data.company,
      current_job: data.current_job,
      education: data.education,
      school: data.school,
      linkedIn: data.linkedIn,
      website: data.website,
      expertise: data.expertise,
      industries: data.industries,
      skills: data.skills,
      professional_years_experience: data.professional_years_experience,
      first_name: data.first_name,
      last_name: data.last_name,
      country: data.country,
      updatedAt: serverTimestamp(),
    };

    batch.update(userRef, userFields);
    batch.update(mentorRef, mentorFields);

    return from(batch.commit());
  }

  //UPDATE MENTEE INFO
  updateMenteeInfo(uid: string, data: any): Observable<void> {
    const batch = writeBatch(this.firestore);
    const userRef = doc(this.firestore, `users/${uid}`);

    const userFields = {
      ...data,
      updatedAt: serverTimestamp(),
    };

    batch.update(userRef, userFields);
    return from(batch.commit());
  }













  //GET MENTOR PROFILE ONLY (No Personal Info)
  getMentorBasicInfoById(mentorId: string): Observable<any> {
    const itemDoc = doc(this.firestore, `mentorProfiles/${mentorId}`);
    return docData(itemDoc, { idField: 'id' });
  }







  //GET AVAILABILITY SLOT INFO
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


}
