import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupesService } from '../../core/services/groupes.service';
import { Liste } from '../../models/liste.model';
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
        <h2>{{ liste.nom }} ({{ liste.personnes.length }} personnes, {{ liste.tirages }} tirages)</h2>
        <ul>
          <li *ngFor="let personne of liste.personnes">
            👤 {{ personne.nom }}
          </li>
        </ul>
      </div>
    </div>
  `
})
export class DashboardComponent {
  listes: Liste[] = [];

  constructor(private groupesService: GroupesService) {
    this.listes = this.groupesService.getListes();
  }

  ajouterListe(nom: string) {
    this.groupesService.ajouterListe(nom);
    this.listes = this.groupesService.getListes();
  }
}
