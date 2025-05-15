import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {}

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  set<T>(key: string, data: T): void {
    if (this.isBrowser()) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  get<T>(key: string): T | null {
    if (!this.isBrowser()) return null;

    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : null;
  }

  remove(key: string): void {
    if (this.isBrowser()) {
      localStorage.removeItem(key);
    }
  }

  clear(): void {
    if (this.isBrowser()) {
      localStorage.clear();
    }
  }
}
