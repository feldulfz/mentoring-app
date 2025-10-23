import { Component, inject } from '@angular/core';
import { Auth, User, signOut } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-admin.component',
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
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
