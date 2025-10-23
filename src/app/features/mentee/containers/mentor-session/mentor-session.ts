import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-mentor-session',
  imports: [RouterModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './mentor-session.html',
  styleUrl: './mentor-session.scss'
})
export class MentorSession {
  private collapsed = signal(false);

  toggleCollapse() {
    this.collapsed.update(v => !v);
  }

  isCollapsed() {
    return this.collapsed();
  }
}
