// src/app/pages/dashboard/dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { GroupesService } from '../../core/services/groupes.service';
import { Groupe } from '../../models/groupe.model';
import { Tirage } from '../../models/tirage.model';
import { AuthService } from '../../core/services/auth.service';
import { Liste } from '../../models/liste.model';
import { Personne } from '../../models/personne.model';

import { FormCreerListeComponent } from './form-creer-liste.component';
import { FormAjoutPersonneComponent } from './form-ajout-personne.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FormCreerListeComponent,
    FormAjoutPersonneComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  listes: Liste[] = [];
  groupesFormes: { [id: number]: Groupe[] } = {};
  historiqueGroupes: { [id: number]: Tirage[] } = {};
  nombreGroupes: { [id: number]: number } = {};
  criteresMixite: { [id: number]: { anciensDWWM: boolean; mixAge: boolean } } = {};

  constructor(
    private groupesService: GroupesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerListes();
  }

  isAdmin(): boolean {
    return this.authService.getRole() === 'ADMIN';
  }

  redirigerVersAdmin(): void {
    this.router.navigate(['/admin']);
  }

  private chargerListes(): void {
    this.groupesService.getListes().subscribe({
      next: listes => {
        this.listes = listes;
        listes.forEach(l => {
          this.nombreGroupes[l.id] = this.nombreGroupes[l.id] ?? 1;
          this.criteresMixite[l.id] =
            this.criteresMixite[l.id] ?? { anciensDWWM: false, mixAge: false };
          this.chargerHistorique(l.id);
        });
      },
      error: err => console.error('Erreur chargement listes', err)
    });
  }

  creerListe(nom: string): void {
    this.groupesService.ajouterListe(nom).subscribe(() => this.chargerListes());
  }

  ajouterPersonne(event: { idListe: number; personne: Personne }): void {
    this.groupesService
      .ajouterPersonneDansListe(event.idListe, event.personne)
      .subscribe(() => this.chargerListes());
  }

  supprimerListe(id: number): void {
    if (!confirm('Supprimer cette liste et ses personnes ?')) return;
    this.groupesService.supprimerListe(id).subscribe({
      next: () => this.chargerListes(),
      error: err => console.error('Erreur suppression liste', err)
    });
  }

  formerGroupes(id: number): void {
    const liste = this.listes.find(l => l.id === id);
    if (!liste) return;

    const nb = this.nombreGroupes[id];
    const criteres: string[] = [];
    if (this.criteresMixite[id].anciensDWWM) criteres.push('anciensDWWM');
    if (this.criteresMixite[id].mixAge) criteres.push('mixAge');

    const noms = Array.from({ length: nb }, (_, i) => `Groupe ${i + 1}`);
    this.groupesFormes[id] = this.groupesService.formerGroupesAleatoires(
      liste.personnes,
      nb,
      noms,
      criteres
    );
  }

  /** POST: enregistre un nouveau tirage */
  /** POST: enregistre un nouveau tirage */
enregistrerTirage(id: number): void {
  const groupes = this.groupesFormes[id]; // ✅ On définit groupes d'abord
  console.log('[DEBUG] groupes =', groupes); // ✅ Puis on peut l'afficher

  if (!groupes?.length) {
    console.warn('[DEBUG] Pas de groupes à enregistrer pour liste', id);
    return;
  }

  const tirage: Tirage = { groupes, date: new Date(), valide: false };
  this.groupesService.enregistrerTirage(id, tirage).subscribe({
    next: res => {
      console.log('[DEBUG] Tirage enregistré', res);
      delete this.groupesFormes[id];
      this.chargerHistorique(id);
    },
    error: err =>
      console.error('[ERROR] Impossible d’enregistrer le tirage', err)
  });
}

  /** PATCH: valide le dernier tirage existant */
  validerTirage(id: number): void {
    console.log('[DEBUG] validerTirage pour liste', id);
    const hist = this.historiqueGroupes[id] || [];
    const dernier = hist[hist.length - 1];
    if (!dernier?.id) {
      console.warn('[DEBUG] Aucun tirage à valider pour liste', id);
      return;
    }
    this.groupesService.validerTirage(id, dernier.id).subscribe({
      next: upd => {
        console.log('[DEBUG] Tirage validé', upd);
        this.chargerHistorique(id);
      },
      error: err =>
        console.error('[ERROR] Impossible de valider le tirage', err)
    });
  }

  private chargerHistorique(id: number): void {
    this.groupesService
      .getHistoriqueGroupes(id)
      .subscribe(hist => (this.historiqueGroupes[id] = hist));
  }
}
