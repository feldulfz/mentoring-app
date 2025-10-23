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
}
