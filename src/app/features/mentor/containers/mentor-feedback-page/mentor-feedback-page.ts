import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionRatingCard } from "../../../../shared/components/session-rating-card/session-rating-card";
import { toSignal } from '@angular/core/rxjs-interop';
import { DashboardService } from '../../../../core/services/mentor-service/dashboard-service';


@Component({
  selector: 'app-mentor-feedback-page',
  imports: [SessionRatingCard],
  templateUrl: './mentor-feedback-page.html',
  styleUrl: './mentor-feedback-page.scss'
})
export class MentorFeedbackPage {

  private activatedRouter = inject(ActivatedRoute);
  private dashboardService = inject(DashboardService);


  user = this.activatedRouter.snapshot.parent?.data['user'];
  mentorId = signal(this.user.id);


  completedRatedSessions = toSignal(this.dashboardService.getCompletedRatedSessions(this.user.id), { initialValue: []});



}
