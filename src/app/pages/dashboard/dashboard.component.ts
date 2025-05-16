import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupesService } from '../../core/services/groupes.service';
import { Liste } from '../../models/liste.model';
import { Personne } from '../../models/personne.model';
import { FormListeComponent } from './form-liste.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormListeComponent],
  template: `
    <div class="dashboard">
      <h1>Vos listes</h1>

      <app-form-liste (nouvelleListe)="ajouterListe($event)"></app-form-liste>

      <div *ngFor="let liste of listes" class="liste">
        <h2>
          {{ liste.nom }} ({{ liste.personnes.length }} personnes, {{ liste.tirages }} tirages)
        </h2>

        <button (click)="formerGroupes(liste.nom)">Former des groupes</button>

        <ul>
          <li *ngFor="let personne of liste.personnes">
            👤 {{ personne.nom }}
          </li>
        </ul>

        <div *ngIf="groupesFormes[liste.nom]?.length">
          <h3>Groupes formés :</h3>
          <div *ngFor="let groupe of groupesFormes[liste.nom]; let i = index" style="margin-bottom:1rem;">
            <strong>Groupe {{ i + 1 }}</strong>
            <ul>
              <li *ngFor="let p of groupe">{{ p.nom }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  listes: Liste[] = [];
  groupesFormes: { [nomListe: string]: Personne[][] } = {};

  constructor(private groupesService: GroupesService) {
    this.listes = this.groupesService.getListes();
  }

  ajouterListe(listeData: { nom: string; personnes: Personne[] }) {
    this.groupesService.ajouterListe(listeData.nom);
    listeData.personnes.forEach(p => {
      this.groupesService.ajouterPersonneDansListe(listeData.nom, p);
    });
    this.listes = this.groupesService.getListes();
  }

  formerGroupes(nomListe: string): void {
    const tailleGroupe = 3; 
    this.groupesFormes[nomListe] = this.groupesService.formerGroupesAleatoires(nomListe, tailleGroupe);
  }
}
