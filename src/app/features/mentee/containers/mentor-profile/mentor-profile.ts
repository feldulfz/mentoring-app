import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MenteeSectionHeading } from '../../components/mentee-section-heading/mentee-section-heading';
import { Jumbotron } from '../../../../shared/components/jumbotron/jumbotron';
import { Tags } from '../../components/tags/tags';
import { AvailabilityCard } from '../../../../shared/components/availability-card/availability-card';
import { StatsBox } from '../../../../shared/components/stats-box/stats-box';
import { ActivatedRoute } from '@angular/router';
import { MentorService } from '../../../../core/services/mentee-service/mentor.service';
import { BookMentorComponent } from '../book-mentor/book-mentor.component';
import { switchMap } from 'rxjs';
import { DashboardService } from '../../../../core/services/mentor-service/dashboard-service';
import { SessionRatingCard } from "../../../../shared/components/session-rating-card/session-rating-card";
import { CommonModule } from '@angular/common';

export interface IMentorStats {
  totalCompletedSessions: number
  averageRating: number
  uniqueMentees: number
  totalFeedbackGiven: number
}

export interface IMentorProfile {
  last_name: string
  professional_years_experience: number
  updatedAt: IUpdatedAt
  expertise: string[]
  industries: string[]
  school: string
  current_job: string
  website: string
  bio: string
  country: string
  createdAt: ICreatedAt
  linkedIn: string
  skills: string[]
  company: string
  education: string
  searchTokens: string[]
  uid: string
  first_name: string
  id: string
}

export interface ICompletedRatedSessions {
  updatedAt: IUpdatedAt
  message: string
  createdAt: ICreatedAt
  menteePrivateNotes: string
  ratingToMentor: number
  meetingLink: string
  menteeResources: string
  mentorResources: string
  slotId: string
  feedbackToMentor: string
  mentorId: string
  ratingToMentee: number
  mentorPrivateNotes: string
  about: string
  status: string
  menteeId: string
  feedbackToMentee: string
  sharedNotes: string
  announcement: string
  id: string
  mentee: IMentee
  slot: ISlot
}

export interface IMentee {
  last_name: string
  createdAt: ICreatedAt
  uid: string
  emailIsVerified: boolean
  roles: string[]
  updatedAt: IUpdatedAt
  email: string
  first_name: string
  id: string
}

export interface ISlot {
  id: string
  startAt: string
  endAt: string
  createdAt: string
  status: string
  bookedBy: string
  sessionId: string
}

export interface IAvailableSlots {
  updatedAt: IUpdatedAt
  bookedBy: string
  endAt: string
  startAt: string
  createdAt: string
  recurring: boolean
  sessionId: string
  status: string
  id: string
}

export interface IUpdatedAt {
  type: string
  seconds: number
  nanoseconds: number
}

export interface ICreatedAt {
  type: string
  seconds: number
  nanoseconds: number
}

@Component({
  selector: 'app-mentor-profile',
  imports: [CommonModule, MenteeSectionHeading, Jumbotron, Tags, AvailabilityCard, StatsBox, BookMentorComponent, SessionRatingCard],
  templateUrl: './mentor-profile.html',
  styleUrl: './mentor-profile.scss'
})
export class MentorProfile {
  private activatedRoute = inject(ActivatedRoute);
  private mentorService = inject(MentorService);
  private dashboardService = inject(DashboardService);

  mentorId = toSignal(
    this.activatedRoute.params.pipe(switchMap(params => [params['uid']])),
    { initialValue: '' }
  );

  mentorProfile = toSignal<IMentorProfile>(this.mentorService.getItemById(this.mentorId()), { initialValue: null });
  mentorStats = toSignal<IMentorStats>(this.dashboardService.getMentorStats(this.mentorId()), { initialValue: null });
  completedRatedSessions = toSignal(this.dashboardService.getCompletedRatedSessions(this.mentorId()), { initialValue: [] });
  availableSlots = toSignal<IAvailableSlots[]>(this.mentorService.getAllAvailability(this.mentorId()), { initialValue: null });

  formattedSlots = computed(() => {
    return this.availableSlots()?.map(slot => {
      const start = new Date(slot.startAt);
      return {
        month: start.toLocaleString('en-US', { month: 'short' }),
        day: start.getDate(),
        weekday: start.toLocaleString('en-US', { weekday: 'short' }),
        startAt: `${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      };
    });
  });

}
