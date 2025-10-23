import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-stats-box',
  templateUrl: './stats-box.html',
  styleUrls: ['./stats-box.scss']
})
export class StatsBox {
  // Modern Angular signal input
  mentorStats = input<{
    totalCompletedSessions: number;
    averageRating: number;
    uniqueMentees: number;
    totalFeedbackGiven: number;
  } | null>(null);
}
