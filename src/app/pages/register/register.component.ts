// src/app/pages/register/register.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';   // Vérification confirmation mot de passe
  errorMessage = '';
  successMessage = '';     // Message à l'utilisateur en cas de succès

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Envoi des données de création de compte au service AuthService.
   */
  onRegister(): void {
    this.errorMessage = '';
    this.successMessage = '';

    // 1. Vérification que les mots de passe correspondent
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    // 2. Appel du service d'inscription
    this.authService.register(this.username, this.email, this.password)
      .subscribe({
        next: () => {
          // Succès : on affiche un message utile sans confondre avec login
          this.successMessage = 'Compte créé avec succès ! Connectez-vous via la page de login.';
          // Reset du formulaire
          this.username = '';
          this.email = '';
          this.password = '';
          this.confirmPassword = '';
        },
        error: err => {
          // Ici, seul l'erreur de signup est gérée
          this.errorMessage = err.error?.message || 'Échec de la création de compte.';
        }
      });
  }
}
