import { Component, signal } from '@angular/core';
import { MentorCard2 } from "../../../features/mentee/components/mentor-card-2/mentor-card-2";

@Component({
  selector: 'app-sliding-card',
  imports: [MentorCard2],
  templateUrl: './sliding-card.html',
  styleUrl: './sliding-card.scss'
})
export class SlidingCard {
 stopScroll = signal(false);

  // since we removed dynamic data, we can hardcode animation duration directly
  animationDuration = '50000ms'; // adjust as needed
}
