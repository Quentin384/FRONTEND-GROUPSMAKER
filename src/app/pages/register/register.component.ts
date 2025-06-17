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
  confirmPassword = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Envoi des données de création de compte au service AuthService.
   */
  onRegister(): void {
    this.errorMessage = '';

    // Vérifie la correspondance des mots de passe
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    // Appelle l’API pour s’enregistrer
    this.authService.register(this.username, this.email, this.password)
      .subscribe({
        next: () => {
          // Réinitialise le formulaire
          this.username = '';
          this.email = '';
          this.password = '';
          this.confirmPassword = '';

          // Redirige vers /login avec message optionnel
          this.router.navigate(['/login'], {
            state: { message: 'Compte créé avec succès ! Vous pouvez maintenant vous connecter.' }
          });
        },
        error: err => {
          this.errorMessage = err.error?.message || 'Échec de la création de compte.';
        }
      });
  }
}
