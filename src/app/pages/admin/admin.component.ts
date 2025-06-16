import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Utilisateur } from '../../models/utilisateur.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];
  statistiques: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.chargerUtilisateurs();
    this.chargerStats();
  }

  chargerUtilisateurs(): void {
    this.authService.getAllUsers().subscribe(users => this.utilisateurs = users);
  }

  supprimerUtilisateur(id: string): void {
    this.authService.deleteUser(id).subscribe(() => this.chargerUtilisateurs());
  }

  chargerStats(): void {
    this.authService.getStats().subscribe(stats => this.statistiques = stats);
  }

  modifierParametres(valeurs: any): void {
    console.log('Paramètres admin modifiés :', valeurs);
    // TODO: envoyer les nouvelles valeurs au backend si nécessaire
  }
}
