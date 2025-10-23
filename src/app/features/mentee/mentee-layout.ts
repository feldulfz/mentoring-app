import { Component } from '@angular/core';
import { MenteeNavbar } from './components/mentee-navbar/mentee-navbar';
import { RouterOutlet } from "@angular/router";
import { Footer } from "../../shared/components/footer/footer";

@Component({
  selector: 'app-mentee-layout',
  standalone: true,
  imports: [MenteeNavbar, RouterOutlet, Footer],
  template: `
    <app-mentee-navbar></app-mentee-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
})
export class MenteeLayout { }
