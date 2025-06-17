import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (success) => {
        if (success) {
        //  this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Identifiants incorrects';
        }
      },
      error: (err) => {
        this.errorMessage = 'Erreur serveur lors de la connexion';
        console.error(err);
      }
    });
  }
}
