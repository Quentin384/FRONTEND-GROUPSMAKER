import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  // Champs liés au formulaire
  email = '';
  username = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  /**
   * Appelée lors de la soumission du formulaire d'inscription.
   * Valide les données et envoie une requête POST au backend.
   */
  onRegister(): void {
    // Vérifie la correspondance des mots de passe
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return;
    }

    // Prépare les données à envoyer au backend
    const userData = {
      username: this.username, // utilisé par le backend comme identifiant
      password: this.password
    };

    // Envoie la requête d'inscription
    this.http.post('http://localhost:8080/api/auth/register', userData).subscribe({
      next: () => {
        alert('Inscription réussie !');
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error(err);
        this.errorMessage = 'Erreur lors de l’inscription.';
      }
    });
  }
}
