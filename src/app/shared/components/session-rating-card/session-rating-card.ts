import { Component, input  } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-session-rating-card',
  imports: [TagModule, RatingModule, FormsModule , DatePipe],
  templateUrl: './session-rating-card.html',
  styleUrl: './session-rating-card.scss'
})
export class SessionRatingCard {

  completedRatedSessions = input<any>('');


}
