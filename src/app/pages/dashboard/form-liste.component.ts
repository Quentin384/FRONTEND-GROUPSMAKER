import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Personne } from '../../models/personne.model';

@Component({
  selector: 'app-form-liste',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" class="form">
      <input
        type="text"
        [(ngModel)]="nomListe"
        name="nomListe"
        placeholder="Nom de la nouvelle liste"
        required
      />

      <button type="submit">Créer la liste</button>
    </form>

    <h3>Ajouter une personne</h3>
    <form (ngSubmit)="ajouterPersonne()" class="form">
      <input
        type="text"
        [(ngModel)]="nouvellePersonne.nom"
        name="nom"
        placeholder="Nom"
        required
      />
      <input
        type="text"
        [(ngModel)]="nouvellePersonne.genre"
        name="genre"
        placeholder="Genre"
        required
      />
      <input
        type="number"
        [(ngModel)]="nouvellePersonne.aisanceFrancais"
        name="aisanceFrancais"
        placeholder="Aisance Français (1-5)"
        min="1"
        max="5"
        required
      />
      <label>
        Ancien DWWM
        <input
          type="checkbox"
          [(ngModel)]="nouvellePersonne.ancienDWWM"
          name="ancienDWWM"
        />
      </label>
      <input
        type="number"
        [(ngModel)]="nouvellePersonne.niveauTechnique"
        name="niveauTechnique"
        placeholder="Niveau technique (1-5)"
        min="1"
        max="5"
        required
      />
      <input
        type="text"
        [(ngModel)]="nouvellePersonne.profil"
        name="profil"
        placeholder="Profil"
        required
      />
      <input
        type="number"
        [(ngModel)]="nouvellePersonne.age"
        name="age"
        placeholder="Âge"
        min="0"
        required
      />

      <button type="submit">Ajouter la personne</button>
    </form>

    <h3>Personnes ajoutées</h3>
    <ul>
      <li *ngFor="let p of personnes">
        {{ p.nom }} - {{ p.profil }} ({{ p.age }} ans)
      </li>
    </ul>
  `,
  styles: [`
    .form {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }
    input, label {
      margin-right: 0.5rem;
    }
    input[type="checkbox"] {
      margin-left: 0.5rem;
    }
    button {
      padding: 0.5rem 1rem;
    }
  `]
})
export class FormListeComponent {
  nomListe = '';

  personnes: Personne[] = [];

  nouvellePersonne: Personne = {
    nom: '',
    genre: '',
    aisanceFrancais: 1,
    ancienDWWM: false,
    niveauTechnique: 1,
    profil: '',
    age: 0
  };

  @Output() nouvelleListe = new EventEmitter<{ nom: string; personnes: Personne[] }>();

  ajouterPersonne() {
    // Validation simple
    if (!this.nouvellePersonne.nom.trim()) return;

    this.personnes.push({ ...this.nouvellePersonne });

    // Réinitialiser le formulaire personne
    this.nouvellePersonne = {
      nom: '',
      genre: '',
      aisanceFrancais: 1,
      ancienDWWM: false,
      niveauTechnique: 1,
      profil: '',
      age: 0
    };
  }

  onSubmit() {
    if (!this.nomListe.trim()) return;

    this.nouvelleListe.emit({
      nom: this.nomListe.trim(),
      personnes: this.personnes
    });

    // Reset
    this.nomListe = '';
    this.personnes = [];
  }
}
