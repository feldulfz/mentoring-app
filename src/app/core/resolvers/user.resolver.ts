import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<any> {
  private auth = inject(Auth);
  private afs = inject(Firestore);

  resolve(): Observable<any> {
    return authState(this.auth).pipe(
      switchMap(user => {
        if (!user) return of(null);
        const userDoc = doc(this.afs, `users/${user.uid}`);
        return docData(userDoc, { idField: 'id' }); // returns Firestore doc with role
      })
    );
  }
}