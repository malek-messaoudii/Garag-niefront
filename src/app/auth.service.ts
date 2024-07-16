import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private role: string | null = null;

  setRole(role: string): void {
    this.role = role;
    localStorage.setItem('role', role);
  }

  getRole(): string | null {
    if (!this.role) {
      this.role = localStorage.getItem('role');
    }
    return this.role;
  }

  clearRole(): void {
    this.role = null;
    localStorage.removeItem('role');
  }
}
