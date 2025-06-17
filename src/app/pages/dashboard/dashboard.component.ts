import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupesService, Groupe, Tirage } from '../../core/services/groupes.service';
import { Liste } from '../../models/liste.model';
import { Personne } from '../../models/personne.model';
import { FormListeComponent } from './form-liste.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, FormListeComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // Toutes les listes disponibles
  listes: Liste[] = [];

  // Groupes temporairement formés (non validés)
  groupesFormes: { [nomListe: string]: Groupe[] } = {};

  // Historique des tirages enregistrés
  historiqueGroupes: { [nomListe: string]: Tirage[] } = {};

  // Nombre de groupes souhaités par liste
  nombreGroupes: { [nomListe: string]: number } = {};

  // Noms personnalisés des groupes
  nomsGroupes: { [nomListe: string]: string[] } = {};

  // Critères de mixité cochés par liste
  criteresMixite: { [nomListe: string]: { anciensDWWM: boolean; mixAge: boolean } } = {};

constructor(
  private groupesService: GroupesService,
  private authService: AuthService,
  private router: Router
) {
  console.log('📦 Token JWT :', this.authService.getToken());
  console.log('🔐 Rôle utilisateur :', this.authService.getRole());

  // this.listes = this.groupesService.getListes();
  // this.historiqueGroupes = this.groupesService.getHistoriqueGroupes();
}


  // ✅ Méthode appelée dans le HTML pour afficher le bouton "admin"
  isAdmin(): boolean {
    return this.authService.getRole() === 'ADMIN';
  }

  // ✅ Redirige l’utilisateur vers la page d'administration
  redirigerVersAdmin(): void {
    this.router.navigate(['/admin']);
  }

  // Ajoute une nouvelle liste à partir du formulaire
  ajouterListe(listeData: { nom: string; personnes: Personne[] }) {
    this.groupesService.ajouterListe(listeData.nom);
    listeData.personnes.forEach(p => {
      this.groupesService.ajouterPersonneDansListe(listeData.nom, p);
    });
    this.listes = this.groupesService.getListes();
    this.historiqueGroupes = this.groupesService.getHistoriqueGroupes();
  }

  // Crée un tableau de longueur `n` (utilisé dans *ngFor)
  iter(n: number): number[] {
    return Array(n);
  }

  // Initialise les noms de groupes avec "Groupe 1", "Groupe 2", ...
  initNomsGroupes(nomListe: string): void {
    const nb = this.nombreGroupes[nomListe] || 1;
    this.nomsGroupes[nomListe] = Array(nb).fill('').map((_, i) => `Groupe ${i + 1}`);
    if (!this.criteresMixite[nomListe]) {
      this.criteresMixite[nomListe] = { anciensDWWM: false, mixAge: false };
    }
  }

  // Appelle le service pour former les groupes en fonction des critères et du nombre
  formerGroupes(nomListe: string): void {
    const nbGroupes = this.nombreGroupes[nomListe];
    const noms = this.nomsGroupes[nomListe];
    if (!nbGroupes || !noms || noms.length !== nbGroupes) return;

    const criteres = [];
    if (this.criteresMixite[nomListe]?.anciensDWWM) criteres.push('anciensDWWM');
    if (this.criteresMixite[nomListe]?.mixAge) criteres.push('mixAge');

    const groupes = this.groupesService.formerGroupesAleatoires(nomListe, nbGroupes, noms, criteres);
    this.groupesFormes[nomListe] = groupes;

    // Met à jour l’historique après tirage
    this.historiqueGroupes = this.groupesService.getHistoriqueGroupes();
  }

  // Valide définitivement un tirage et le rend immuable
  validerTirage(nomListe: string): void {
    this.groupesService.validerTirage(nomListe);
    this.historiqueGroupes = this.groupesService.getHistoriqueGroupes();
    this.groupesFormes[nomListe] = []; // vide les groupes en cours
  }

  // Vérifie si le dernier tirage est validé (bloque modifications)
  estTirageValide(nomListe: string): boolean {
    const tirage = this.groupesService.getDernierTirage(nomListe);
    return tirage?.valide ?? false;
  }
}
