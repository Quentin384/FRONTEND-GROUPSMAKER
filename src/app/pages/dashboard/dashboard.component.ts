import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupesService, Groupe, Tirage } from '../../core/services/groupes.service';
import { Liste } from '../../models/liste.model';
import { Personne } from '../../models/personne.model';
import { FormListeComponent } from './form-liste.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, FormListeComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  listes: Liste[] = [];
  groupesFormes: { [nomListe: string]: Groupe[] } = {};
  historiqueGroupes: { [nomListe: string]: Tirage[] } = {};
  nombreGroupes: { [nomListe: string]: number } = {};
  nomsGroupes: { [nomListe: string]: string[] } = {};
  criteresMixite: { [nomListe: string]: { anciensDWWM: boolean; mixAge: boolean } } = {};

  constructor(private groupesService: GroupesService) {
    this.listes = this.groupesService.getListes();
    this.historiqueGroupes = this.groupesService.getHistoriqueGroupes();
  }

  ajouterListe(listeData: { nom: string; personnes: Personne[] }) {
    this.groupesService.ajouterListe(listeData.nom);
    listeData.personnes.forEach(p => {
      this.groupesService.ajouterPersonneDansListe(listeData.nom, p);
    });
    this.listes = this.groupesService.getListes();
    this.historiqueGroupes = this.groupesService.getHistoriqueGroupes();
  }

  iter(n: number): number[] {
    return Array(n);
  }

  initNomsGroupes(nomListe: string): void {
    const nb = this.nombreGroupes[nomListe] || 1;
    this.nomsGroupes[nomListe] = Array(nb).fill('').map((_, i) => `Groupe ${i + 1}`);
    if (!this.criteresMixite[nomListe]) {
      this.criteresMixite[nomListe] = { anciensDWWM: false, mixAge: false };
    }
  }

  formerGroupes(nomListe: string): void {
    const nbGroupes = this.nombreGroupes[nomListe];
    const noms = this.nomsGroupes[nomListe];
    if (!nbGroupes || !noms || noms.length !== nbGroupes) return;

    const criteres = [];
    if (this.criteresMixite[nomListe]?.anciensDWWM) criteres.push('anciensDWWM');
    if (this.criteresMixite[nomListe]?.mixAge) criteres.push('mixAge');

    const groupes = this.groupesService.formerGroupesAleatoires(nomListe, nbGroupes, noms, criteres);
    this.groupesFormes[nomListe] = groupes;

    // Mettre à jour l'historique à chaque tirage pour refléter le dernier tirage en cours
    this.historiqueGroupes = this.groupesService.getHistoriqueGroupes();
  }

  validerTirage(nomListe: string): void {
    this.groupesService.validerTirage(nomListe);
    // Mettre à jour l'historique et réinitialiser groupesFormes
    this.historiqueGroupes = this.groupesService.getHistoriqueGroupes();
    this.groupesFormes[nomListe] = [];
  }

  estTirageValide(nomListe: string): boolean {
    const tirage = this.groupesService.getDernierTirage(nomListe);
    return tirage?.valide ?? false;
  }
}
