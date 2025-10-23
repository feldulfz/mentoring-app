import { Routes } from '@angular/router';
import { MentorDashboardPage } from './containers/mentor-dashboard-page/mentor-dashboard-page';
import { MentorProfilePage } from './containers/mentor-profile-page/mentor-profile-page';
import { MentorSessionsPage } from './containers/mentor-sessions-page/mentor-sessions-page';
import { MentorsMenteePage } from './containers/mentors-mentee-page/mentors-mentee-page';
import { MentorFeedbackPage } from './containers/mentor-feedback-page/mentor-feedback-page';
import { MentorSchedulePage } from './containers/mentor-schedule-page/mentor-schedule-page';
import { ProductTableComponent } from './containers/product-table/product-table.component';
import { MentorLayout } from './mentor-layout';

export const MENTOR_ROUTES: Routes = [
  {
    path: '',
    component: MentorLayout,
    children: [
      {
        path: 'dashboard',
        component: MentorDashboardPage,
      },
      {
        path: 'profile',
        component: MentorProfilePage,
      },
      {
        path: 'sessions',
        component: MentorSessionsPage,
      },
      {
        path: 'mentees',
        component: MentorsMenteePage,
      },
      {
        path: 'feedback',
        component: MentorFeedbackPage,
      },
      {
        path: 'schedule',
        component: MentorSchedulePage,
      },
      {
        path: 'sample-table',
        component: ProductTableComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
