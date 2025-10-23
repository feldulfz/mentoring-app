import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CompleteProfileGuard {
  constructor(private router: Router) {}

  canActivate: CanActivateFn = (route, state) => {
    const uid = route.queryParamMap.get('uid');
    const email = route.queryParamMap.get('email');

    if (uid && email) {
      return true; // allow access
    }

    // if missing, redirect back to sign-in
    this.router.navigate(['/auth/sign-in']);
    return false;
  };
}