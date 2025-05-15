import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';  // Import RouterModule ici
import { AuthService } from '../../core/services/auth.service';
import { Utilisateur } from '../../models/utilisateur.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],  // Ajouter RouterModule dans imports
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    const utilisateurs = this.authService.getAllUsers();

    if (utilisateurs.some(u => u.email === this.email)) {
      this.errorMessage = 'Un utilisateur avec cet email existe déjà.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    const nouveau = new Utilisateur(uuidv4(), this.email, this.password);
    utilisateurs.push(nouveau);
    this.authService.saveUsers(utilisateurs);
    this.authService.login(this.email, this.password);
    this.router.navigateByUrl('/dashboard');
  }
}
