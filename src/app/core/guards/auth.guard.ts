// src/app/core/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn();
  const requiredRoles = route.data['role'];
  const userRole = authService.getRole();

  console.log('🔐 AuthGuard exécuté');
  console.log('➡️ Connecté :', isLoggedIn);
  console.log('🎯 Rôle requis :', requiredRoles);
  console.log('👤 Rôle utilisateur :', userRole);

  if (!isLoggedIn) {
    console.warn('⛔ Non connecté → redirection vers /login');
    return router.parseUrl('/login');
  }

  const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

  if (requiredRoles && !roles.includes(userRole)) {
    console.warn('⛔ Rôle insuffisant → redirection vers /');
    return router.parseUrl('/');
  }

  console.log('✅ Accès autorisé');
  return true;
};
