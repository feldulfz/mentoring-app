import { Routes } from '@angular/router';
import { DashboardSessionComponent } from './pages/dashboard-session/dashboard-session.component';
import { NotesComponent } from './pages/notes/notes.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { AssignmentsComponent } from './pages/assignments/assignments.component';

export const MENTOR_SESSION_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'dashboard-session',
        pathMatch: 'full'
    },
    {
        path: 'dashboard-session',
        component: DashboardSessionComponent
    },
    {
        path: 'notes',
        component: NotesComponent
    },
    {
        path: 'resources',
        component: ResourcesComponent
    },
    {
        path: 'assignments',
        component: AssignmentsComponent
    },
];

export class MentorSessionRoutingModule { }
