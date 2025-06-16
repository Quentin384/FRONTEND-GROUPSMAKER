// src/app/core/guards/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Vérifie si l'utilisateur peut accéder à la route.
   * - Si non connecté : redirection vers login.
   * - Si le rôle requis est défini et non respecté : redirection vers dashboard.
   */
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const requiredRole = route.data['role']; // ex: 'ADMIN' ou 'USER'
    const userRole = this.authService.getRole();

    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    if (requiredRole && userRole !== requiredRole) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }
}
