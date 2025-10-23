import { DatePipe  } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-session-info-card',
  imports: [ TagModule, ButtonModule, DatePipe],
  templateUrl: './session-info-card.html',
  styleUrl: './session-info-card.scss'
})
export class SessionInfoCard {



  upcomingSessions = input<any>();

}
