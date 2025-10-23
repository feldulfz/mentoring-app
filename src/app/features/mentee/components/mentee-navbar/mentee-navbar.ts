import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavLink } from "../../../../shared/components/nav-link/nav-link";
import { Auth, signOut } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalService } from '../../../../core/services/toast-service/swal.service';
import { LoaderService } from '../../../../core/services/loader.service';

@Component({
  selector: 'app-mentee-navbar',
  imports: [RouterLink, NavLink],
  templateUrl: './mentee-navbar.html',
  styleUrl: './mentee-navbar.scss'
})
export class MenteeNavbar {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  swal = inject(SwalService);
  loader = inject(LoaderService);

  firstName = signal<string>('');
  lastName = signal<string>('');
  menuOpen = false;
  profileDropdownOpen = false;

  // get the user from the route (which is injected by the UserResolver)
  user = this.activatedRoute.snapshot.data['user'];


  // get the auth service
  auth = inject(Auth);

  constructor() {
    this.firstName.set(this.user.first_name);
    this.lastName.set(this.user.last_name);
  }

  ngOnInit() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleProfileDropdown() {
    this.profileDropdownOpen = !this.profileDropdownOpen;
  }

  closeMenu() {
    this.menuOpen = false;
    this.profileDropdownOpen = false;
  }

  private handleResize() {
    if (window.innerWidth >= 768 && this.menuOpen) {
      this.menuOpen = false;
    }
  }

  async onSignOut() {
    try {
      this.loader.show();
      await signOut(this.auth);
      this.swal.success('Signed out successfully.');
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error occurred:', error);
    } finally {
      this.loader.hide();
    }
  }


}
