import { Injectable } from '@angular/core';
import { Utilisateur } from '../../models/utilisateur.model';
import { LocalStorageService } from './local-storage.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'utilisateurs';
  private readonly CURRENT_KEY = 'currentUser';

  constructor(private localStorage: LocalStorageService) {
    this.initFakeUsers();
  }

  private initFakeUsers(): void {
    const existing = this.localStorage.get<Utilisateur[]>(this.STORAGE_KEY);
    if (!existing || existing.length === 0) {
      const mock: Utilisateur[] = [
        new Utilisateur(uuidv4(), 'admin@simplon.fr', 'admin123'),
      ];
      this.localStorage.set(this.STORAGE_KEY, mock);
    }
  }

  login(email: string, password: string): boolean {
    const users = this.localStorage.get<Utilisateur[]>(this.STORAGE_KEY) || [];
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      this.localStorage.set(this.CURRENT_KEY, found);
      return true;
    }
    return false;
  }

  logout(): void {
    this.localStorage.remove(this.CURRENT_KEY);
  }

  getCurrentUser(): Utilisateur | null {
    return this.localStorage.get<Utilisateur>(this.CURRENT_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  getAllUsers(): Utilisateur[] {
  return this.localStorage.get<Utilisateur[]>(this.STORAGE_KEY) || [];
}

saveUsers(users: Utilisateur[]): void {
  this.localStorage.set(this.STORAGE_KEY, users);
}

}
