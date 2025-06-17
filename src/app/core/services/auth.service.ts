// src/app/core/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

const TOKEN_KEY = 'jwt_token'; // Clé de stockage du JWT en localStorage

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL de base de l'API d'authentification
  private readonly API_URL = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  /**
   * Authentifie l'utilisateur et stocke le JWT retourné.
   * @returns Observable<boolean> indicateur de succès
   */
  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post(this.API_URL + '/login', { username, password }, { responseType: 'text' })
      .pipe(
        // Sauvegarde du token en localStorage
        tap(token => localStorage.setItem(TOKEN_KEY, token)),
        // En cas de succès, on renvoie true
        map(() => true),
        // En cas d'erreur (401, 500...), on renvoie false
        catchError(() => of(false))
      );
  }

  /**
   * Enregistre un nouvel utilisateur via API.
   * @returns Observable<any> réponse du backend
   */
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.API_URL}/signup`,
      { username, email, password },
      { responseType: 'json' }
    );
  }

  /**
   * Supprime le token JWT du localStorage (déconnexion).
   */
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  /**
   * Récupère le token JWT stocké.
   */
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Indique si un utilisateur est connecté (token présent).
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Récupère les informations du payload JWT décodé.
   */
  private getPayload(): any | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }

  /**
   * Récupère le rôle de l'utilisateur (champ 'role' du payload JWT).
   */
  getRole(): string | null {
    const payload = this.getPayload();
    return payload?.role || null;
  }

  /**
   * Récupère le nom d'utilisateur ('sub' du payload JWT).
   */
  getUsername(): string | null {
    const payload = this.getPayload();
    return payload?.sub || null;
  }

  /**
   * Vérifie si l'utilisateur a le rôle ADMIN.
   */
  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  /**
   * Construit les en-têtes HTTP pour les requêtes protégées.
   */
  private withAuth(): { headers: HttpHeaders } {
    const token = this.getToken();
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  /**
   * Requête admin : récupère tous les utilisateurs.
   */
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(
      'http://localhost:8080/api/admin/utilisateurs',
      this.withAuth()
    );
  }

  /**
   * Requête admin : supprime un utilisateur par ID.
   */
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(
      `http://localhost:8080/api/admin/utilisateurs/${id}`,
      this.withAuth()
    );
  }

  /**
   * Requête admin : récupère les statistiques générales.
   */
  getStats(): Observable<any> {
    return this.http.get<any>(
      'http://localhost:8080/api/admin/statistiques',
      this.withAuth()
    );
  }
}
