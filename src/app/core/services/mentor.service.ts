import { inject, Injectable } from '@angular/core';
import { deleteDoc, updateDoc, docData, doc, addDoc, collection, collectionData, Firestore, Timestamp, getDoc, getDocs, serverTimestamp, setDoc } from '@angular/fire/firestore';
// import { Contact } from '../models/contact.model'; // change this to our desired interface
import { map, Observable } from 'rxjs';
import { getDownloadURL, ref, Storage, uploadBytes, deleteObject } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class MentorService {
  private collectionMentorProfiles = 'mentorProfiles';

  constructor(private firestore: Firestore) { }

  // get all mentors
  getItems(): Observable<any[]> {
    const itemsCollection = collection(this.firestore, this.collectionMentorProfiles);
    return collectionData(itemsCollection, { idField: "id" });
  }

  // read a single item by id
  getItemById(mentorId: string): Observable<any>{
    const itemDoc = doc(this.firestore, `${this.collectionMentorProfiles}/${mentorId}`);
    return docData(itemDoc, { idField: "id"});
  }

  getAllAvailability(mentorId: string): Observable<any[]> {
    const slotsRef = collection(this.firestore,`mentorProfiles/${mentorId}/availability`);
    return collectionData(slotsRef, {idField: 'id'}).pipe(
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
      const { menteeId, mentorId, slotId, goal, message, attachments} = formValue;

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

      const requestsRef = collection(this.firestore, `mentorshipRequests/${menteeId}/requests`);
      const requestDoc = await addDoc(requestsRef, bookingData);

    } catch (err) {
      console.error("Error creating booking mentor:", err);
      throw err;
    }
  }


}
