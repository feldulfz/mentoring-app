import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [ RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  menuOpen = false;
  profileDropdownOpen = false;

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
}
