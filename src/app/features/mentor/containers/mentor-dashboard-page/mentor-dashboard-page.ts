import { Component, inject, signal } from '@angular/core';
import { StatsBox } from '../../../../shared/components/stats-box/stats-box';
import { SessionInfoCard } from "../../../../shared/components/session-info-card/session-info-card";
import { SessionRatingCard } from "../../../../shared/components/session-rating-card/session-rating-card";
import { DashboardService } from '../../../../core/services/mentor-service/dashboard-service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe, JsonPipe } from '@angular/common';
import { GoogleCalendarService } from '../../../../core/services/calendar-service/google-calendar-service';
import { map } from 'rxjs';

export interface MentorStats {
  totalCompletedSessions: number;
  averageRating: number;
  uniqueMentees: number;
  totalFeedbackGiven: number;
}

@Component({
  selector: 'app-mentor-dashboard-page',
  imports: [StatsBox, SessionInfoCard, SessionRatingCard],
  templateUrl: './mentor-dashboard-page.html',
  styleUrl: './mentor-dashboard-page.scss'
})
export class MentorDashboardPage {

  private dashboardService = inject(DashboardService);
  private activatedRoute = inject(ActivatedRoute);
  private calendarService = inject(GoogleCalendarService);

  syncStatus = signal<string>('');
  calendarEvents = signal<any[]>([]);

  mentorId = toSignal(this.activatedRoute.parent!.data.pipe(map(data => data['user']?.id ?? '')),{ initialValue: '' });

  upcomingSessions = toSignal(this.dashboardService.getUpcomingSessions(this.mentorId()), { initialValue: [] });
  mentorStats = toSignal(this.dashboardService.getMentorStats(this.mentorId()), { initialValue: null });
  completedRatedSessions = toSignal(this.dashboardService.getCompletedRatedSessions(this.mentorId()), { initialValue: [] });
  fullMentorData = toSignal(this.dashboardService.getFullMentorData(this.mentorId()), { initialValue: null });

  // Google Calendar Integration
  async syncToGoogleCalendar() {
    try {
      this.syncStatus.set('Authorizing Google Calendar...');
      await this.calendarService.signIn();

      const sessions = this.upcomingSessions();
      if (!sessions.length) {
        this.syncStatus.set('No upcoming sessions found to sync.');
        return;
      }

      this.syncStatus.set(`Syncing ${sessions.length} sessions...`);

      for (const session of sessions) {
        const slot = session.slot;
        if (!slot?.startAt || !slot?.endAt) continue;

        const eventData = {
          title: `Mentorship with ${session.mentee?.firstName || 'Mentee'}`,
          description: session.notes || '',
          startAt: slot.startAt,
          endAt: slot.endAt,
          menteeEmail: session.mentee?.email || '',
        };

        await this.calendarService.createEvent(eventData);
      }

      this.syncStatus.set('All sessions synced to Google Calendar!');
    } catch (error) {
      console.error('Calendar sync failed:', error);
      this.syncStatus.set('Sync failed. See console for details.');
    }
  }

  signOutCalendar() {
    this.calendarService.signOut();
    this.calendarEvents.set([]);
    this.syncStatus.set('Signed out of Google Calendar.');
  }

  async listGoogleEvents() {
    try {
      const events = await this.calendarService.listUpcomingEvents();
      this.calendarEvents.set(events);
    } catch (error) {
      console.error('Failed to load Google events:', error);
    }
  }

}
