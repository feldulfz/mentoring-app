import { inject, Injectable } from '@angular/core';
import { deleteDoc, updateDoc, docData, doc, addDoc, collection, collectionData, Firestore, Timestamp, getDoc, getDocs, serverTimestamp, setDoc, where, query, limit } from '@angular/fire/firestore';
import { combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { getDownloadURL, ref, Storage, uploadBytes, deleteObject } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class MentorService {
  private collectionMentorProfiles = 'mentorProfiles';
  private firestore = inject(Firestore);

  async searchMentors(keyword: string): Promise<any[]> {
    const lowerKeyword = keyword.toLowerCase();
    const mentorsRef = collection(this.firestore, 'mentorProfiles');
    const q = query(mentorsRef, where('searchTokens', 'array-contains-any', lowerKeyword.split('|').slice(0, 20),));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
  }

  // get all mentors
  getItems(): Observable<any[]> {
    const itemsCollection = collection(this.firestore, this.collectionMentorProfiles);
    return collectionData(itemsCollection, { idField: "id" });
  }

  // read a single item by id
  getItemById(mentorId: string): Observable<any> {
    const itemDoc = doc(this.firestore, `${this.collectionMentorProfiles}/${mentorId}`);
    return docData(itemDoc, { idField: "id" });
  }


  getAllAvailability(mentorId: string): Observable<any[]> {
    const slotsRef = collection(this.firestore, `mentorProfiles/${mentorId}/availability`);
    const availableSlotsQuery = query(slotsRef, where('status', '==', 'available'));

    return collectionData(availableSlotsQuery, { idField: 'id' }).pipe(
      map((slots: any[]) =>
        slots.map(slot => ({
          ...slot,
          startAt: slot.startAt?.toDate().toISOString() ?? null,
          endAt: slot.endAt?.toDate().toISOString() ?? null,
          status: slot.status ?? 'available',
          bookedBy: slot.bookedBy ?? null,
          sessionId: slot.sessionId ?? null,
          createdAt: slot.createdAt?.toDate().toISOString() ?? null,
        }))
      )
    );
  }

  async bookSlot(formValue: any): Promise<void> {
    try {
      let bookingData: any = {};
      const { menteeId, mentorId, slotId, goal, message, attachments } = formValue;

      bookingData = {
        menteeId: menteeId,
        mentorId: mentorId,
        slotId: slotId,
        status: "pending",
        goal: goal,
        message: message,
        attachments: attachments,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const requestsRef = collection(this.firestore, `mentorshipRequests`);
      const requestDoc = await addDoc(requestsRef, bookingData);

    } catch (err) {
      console.error("Error creating booking mentor:", err);
      throw err;
    }
  }

}
