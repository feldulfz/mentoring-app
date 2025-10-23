import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, docData, Firestore } from '@angular/fire/firestore';
import { Observable, combineLatest, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenteeLearning {

  private collectionMentorProfile = 'mentorProfiles';
  private collectionMentorRequests = 'mentorshipRequests';
  private firestore = inject(Firestore);

  // Get all mentorship requests as Observable
  getItems(): Observable<any> {
    const itemsCollection = collection(this.firestore, this.collectionMentorRequests);
    return collectionData(itemsCollection, { idField: 'id' });
  }

  // Get mentorship requests with mentor profiles
  getMentorshipRequestsWithMentorInfo(): Observable<any[]> {
    const requestsRef = collection(this.firestore, this.collectionMentorRequests);
    const profilesRef = collection(this.firestore, this.collectionMentorProfile);

    const requests$ = collectionData(requestsRef, { idField: 'id' });
    const profiles$ = collectionData(profilesRef, { idField: 'uid' });

    return combineLatest([requests$, profiles$]).pipe(
      map(([requests, profiles]) =>
        requests.map((request: any) => ({
          ...request,
          mentorProfile: profiles.find((p: any) => p.uid === request.mentorId) || null,
        }))
      )
    );
  }

  // Get a single mentorship request by ID
  getItemById(id: string): Observable<any> {
    const itemDoc = doc(this.firestore, `${this.collectionMentorRequests}/${id}`);
    return docData(itemDoc, { idField: 'id' });
  }

}
