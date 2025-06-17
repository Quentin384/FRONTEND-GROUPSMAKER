import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn();
  const requiredRole = route.data['role'];
  const userRole = authService.getRole();

  if (!isLoggedIn) {
    return router.parseUrl('/login');
  }

  if (requiredRole && userRole !== requiredRole) {
    return router.parseUrl('/dashboard');
  }

  return true;
};
