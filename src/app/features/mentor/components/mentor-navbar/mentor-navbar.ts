import { Component, HostListener, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MentorSidenavLinks } from "../mentor-sidenav-links/mentor-sidenav-links";
import { SidebarService } from '../../../../core/services/sidebar-service';
import { Auth, signOut } from '@angular/fire/auth';
import { SwalService } from '../../../../core/services/toast-service/swal.service';
import { LoaderService } from '../../../../core/services/loader.service';

@Component({
  selector: 'app-mentor-navbar',
  imports: [RouterLink, MentorSidenavLinks],
  templateUrl: './mentor-navbar.html',
  styleUrl: './mentor-navbar.scss',
})
export class MentorNavbar {

private activatedRoute = inject(ActivatedRoute);
auth = inject(Auth);
private router = inject(Router);
private swal = inject(SwalService);
private loader = inject(LoaderService);


firstName = signal<string>('');
lastName = signal<string>('');

user = this.activatedRoute.snapshot.data['user'];

constructor(){
  this.firstName.set(this.user.first_name)
  this.lastName.set(this.user.last_name)
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
















  profileDropdownOpen = false;
  menuOpen = false;
  sidebar = inject(SidebarService);

  toggleSidebar() {
    this.sidebar.toggle();
  }

  closeSidebar() {
    this.sidebar.close();
  }

  @HostListener('window:resize', [])
  onResize() {
    const mobileBreakpoint = 638;
    if (window.innerWidth >= mobileBreakpoint && this.sidebar.isSidebarOpen) {
      this.sidebar.close();
    }
  }
}
