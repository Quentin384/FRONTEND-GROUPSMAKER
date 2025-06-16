// src/app/core/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const TOKEN_KEY = 'jwt_token'; // Clé de stockage locale du token

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  /**
   * Authentifie l'utilisateur en envoyant les identifiants au backend.
   * Le backend retourne un JWT (en texte brut) que l'on stocke en local.
   */
  login(username: string, password: string): Observable<string> {
    return this.http.post(this.API_URL + '/login', { username, password }, { responseType: 'text' })
      .pipe(tap(token => localStorage.setItem(TOKEN_KEY, token)));
  }

  /**
   * Supprime le token JWT du local storage (déconnexion).
   */
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  /**
   * Retourne le token JWT stocké localement.
   */
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Vérifie si un utilisateur est connecté (présence d’un token JWT).
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Récupère le rôle de l'utilisateur connecté à partir du payload du JWT.
   */
  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    } catch (e) {
      return null;
    }
  }

  /**
   * Récupère le nom d'utilisateur (username) à partir du payload du JWT.
   */
  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || null;
    } catch (e) {
      return null;
    }
  }

  /**
   * Indique si l'utilisateur est administrateur.
   */
  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  /**
   * Construit les en-têtes HTTP avec le token pour les requêtes protégées.
   */
  withAuth(): { headers: HttpHeaders } {
    const token = this.getToken();
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  /**
   * Requête admin : récupère la liste des utilisateurs.
   */
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/admin/utilisateurs', this.withAuth());
  }

  /**
   * Requête admin : supprime un utilisateur par son ID.
   */
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/admin/utilisateurs/${id}`, this.withAuth());
  }

  /**
   * Requête admin : récupère les statistiques générales.
   */
  getStats(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/admin/statistiques', this.withAuth());
  }
}
