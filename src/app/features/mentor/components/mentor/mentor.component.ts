import { Component, inject } from '@angular/core';
import { Auth, User, signOut } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mentor.component',
  imports: [],
  templateUrl: './mentor.component.html',
  styleUrl: './mentor.component.scss'
})
export class MentorComponent {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  // get the user from the route (which is injected by the UserResolver)
  user: User = this.activatedRoute.snapshot.data['user'];

  // get the auth service
  auth = inject(Auth);

  constructor() {
    // console.log('Logged in user: ', this.user);
    // console.log('Logged in user: ', this.auth);
  }

  onSignOut() {
    signOut(this.auth).then(response => {
      this.router.navigate(['/auth/sign-in']);
    })
      .catch(error => {
        console.error('Error occured: ', error);
      })
  }
}
