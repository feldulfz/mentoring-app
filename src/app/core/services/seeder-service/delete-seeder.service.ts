import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  writeBatch,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DeleteService {
  private firestore = inject(Firestore);

  async deleteMentorsByCountry(country: string, collectionName: string): Promise<void> {
    const mentorRef = collection(this.firestore, collectionName);
    const q = query(mentorRef, where('country', '==', country));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log(`No mentors found in ${country}.`);
      return;
    }

    const batch = writeBatch(this.firestore);
    let count = 0;

    snapshot.forEach((doc) => {
      batch.delete(doc.ref);
      count++;
    });

    await batch.commit();
    console.log(`✅ Deleted ${count} mentor(s) from ${country}.`);
  }
}
