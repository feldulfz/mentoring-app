import { Routes } from '@angular/router';
import { WelcomePage } from './features/welcome-page/welcome-page';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { UserResolver } from './core/resolvers/user.resolver';
import { RoleGuard } from './core/guards/role.guard';
import { Unauthorized } from './features/unauthorized/unauthorized';

const redirectToLogin = () => redirectUnauthorizedTo('/auth/sign-in');

export const routes: Routes = [
    {
        path: '',
        component: WelcomePage
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('../app/features/auth/auth-routing-module').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'mentee',
        loadChildren: () =>
            import('../app/features/mentee/mentee-routing-module').then(m => m.MENTEE_ROUTES),
        canActivate: [AuthGuard, RoleGuard],
        data: { authGuardPipe: redirectToLogin, roles: ['mentee'] },
        resolve: { user: UserResolver }
    },
    {
        path: 'mentor',
        loadChildren: () =>
            import('../app/features/mentor/mentor-routing-module').then(m => m.MENTOR_ROUTES),
        canActivate: [AuthGuard, RoleGuard],
        data: { authGuardPipe: redirectToLogin, roles: ['mentor'] },
        resolve: { user: UserResolver }
    },
    {
        path: 'admin',
        loadChildren: () =>
            import('../app/features/admin/admin-routing-module').then(m => m.ADMIN_ROUTES),
        canActivate: [AuthGuard, RoleGuard],
        data: { authGuardPipe: redirectToLogin, roles: ['admin'] },
        resolve: { user: UserResolver }
    },
    {
        path: 'unauthorized',
        component: Unauthorized
    }

];
