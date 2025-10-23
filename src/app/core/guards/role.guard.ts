import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserResolver } from '../resolvers/user.resolver';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoleGuard {
  private router = inject(Router);
  private userResolver = inject(UserResolver);

  canActivate: CanActivateFn = (route: ActivatedRouteSnapshot) => {
    const expectedRoles = route.data['roles'] as string[];

    return this.userResolver.resolve().pipe(
      map(user => {
        if (!user) {
          this.router.navigate(['/auth/sign-in']);
          return false;
        }
        
        if (user.roles.some((role: string) => expectedRoles.includes(role))) {
          return true;
        }           

        this.router.navigate(['/unauthorized']);
        return false;
      })
    );
  };
}