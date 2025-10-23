import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MentorNavbar } from './components/mentor-navbar/mentor-navbar';
import { MentorSidenavLinks } from './components/mentor-sidenav-links/mentor-sidenav-links';


@Component({
  selector: 'app-mentor-layout',
  standalone: true,
  imports: [MentorNavbar, MentorSidenavLinks, RouterOutlet],
  template: `
    <div class="flex flex-col min-h-screen">
      <app-mentor-navbar class="shrink-0" />

      <div class="flex flex-1">

        <aside class="sm:block min-h-[100%] w-64 bg-white shadow-lg z-50 transform hidden transition-transform duration-300 ease-in-out
            -translate-x-full md:translate-x-0" [class.translate-x-0]="isSidebarOpen || !isMobile"
          (click)="$event.stopPropagation()">

          <app-mentor-sidenav-links></app-mentor-sidenav-links>
          <a routerLink="/mentor/feedback"></a>
        </aside>
        <div class="flex-1 p-9 overflow-y-auto">
          <router-outlet></router-outlet>
        </div>

      </div>
    </div>
  `,  
})
export class MentorLayout {

  isSidebarOpen = false;
  isMobile = false;

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  ngOnInit() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 638;
  }
}
