import { Routes } from '@angular/router';
import { MenteeDashboard } from './containers/mentee-dashboard/mentee-dashboard';
import { Mylearning } from './containers/mylearning/mylearning';
import { MentorSession } from './containers/mentor-session/mentor-session';
import { MenteeProfile } from './containers/mentee-profile/mentee-profile';
import { MentorProfile } from './containers/mentor-profile/mentor-profile';
import { SearchPageComponent } from './containers/search-page/search-page.component';
import { MenteeLayout } from './mentee-layout';

export const MENTEE_ROUTES: Routes = [
    {
        path: '',
        component: MenteeLayout,
        children: [
            {
                path: '',
                redirectTo: 'dashboard', // ok na
                pathMatch: 'full',
            },            
            {
                path: 'dashboard',
                component: MenteeDashboard // ok na
            },
            {
                path: 'mylearning',
                component: Mylearning // ok na
            },
            {
                path: 'mylearning/session/:slotId',
                component: MentorSession, // ok na
                loadChildren: () =>
                    import('../mentee/containers/mentor-session/mentor-session.routes').then(
                        (m) => m.MENTOR_SESSION_ROUTES
                    ),
            },
            {
                path: 'profile',
                component: MenteeProfile // ok na
            },
            {
                path: 'mentor-profile/:uid',
                component: MentorProfile // ok na
            },
            {
                path: 'search-page',
                component: SearchPageComponent  // ok na
            }
        ],
    }
];
