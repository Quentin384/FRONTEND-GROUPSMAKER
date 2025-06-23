import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // On récupère le token depuis le localStorage
  const token = localStorage.getItem('jwt_token');

  // On ne modifie PAS les requêtes de login/signup (ajuste selon ton backend !)
  if (
    req.url.endsWith('/auth/login') ||
    req.url.endsWith('/auth/signup')
  ) {
    return next(req);
  }

  // Si le token existe, on clone la requête et on ajoute le header Authorization
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }

  // Sinon, requête inchangée
  return next(req);
};
