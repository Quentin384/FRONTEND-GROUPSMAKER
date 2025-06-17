import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn();
  const requiredRole = route.data['role'];
  const userRole = authService.getRole();

  console.log('🔐 AuthGuard exécuté');
  console.log('➡️ Connecté :', isLoggedIn);
  console.log('🎯 Rôle requis :', requiredRole);
  console.log('👤 Rôle utilisateur :', userRole);

  if (!isLoggedIn) {
    console.log('⛔ Non connecté → redirection vers /login');
    return router.parseUrl('/login');
  }

  if (requiredRole && userRole !== requiredRole) {
    console.log('⛔ Rôle insuffisant → redirection vers /dashboard');
    return router.parseUrl('/dashboard');
  }

  console.log('✅ Accès autorisé');
  return true;
};
