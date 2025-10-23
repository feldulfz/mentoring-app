import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-availability-card',
  imports: [],
  templateUrl: './availability-card.html',
  styleUrl: './availability-card.scss'
})
export class AvailabilityCard {
  month = input<string>();
  day = input<number>();
  weekday = input<string>();
  startAt = input<string>();
}
