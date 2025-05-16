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
        minlength="4"
        maxlength="49"
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
        minlength="4"
        maxlength="49"
      />

      <select [(ngModel)]="nouvellePersonne.genre" name="genre" required>
        <option value="" disabled selected>Choisir un genre</option>
        <option value="masculin">Masculin</option>
        <option value="féminin">Féminin</option>
        <option value="ne se prononce pas">Ne se prononce pas</option>
      </select>

      <select [(ngModel)]="nouvellePersonne.aisanceFrancais" name="aisanceFrancais" required>
        <option value="" disabled selected>Aisance en français</option>
        <option *ngFor="let n of [1, 2, 3, 4]" [value]="n">{{ n }}</option>
      </select>

      <label>
        Ancien DWWM
        <input
          type="checkbox"
          [(ngModel)]="nouvellePersonne.ancienDWWM"
          name="ancienDWWM"
        />
      </label>

      <select [(ngModel)]="nouvellePersonne.niveauTechnique" name="niveauTechnique" required>
        <option value="" disabled selected>Niveau technique</option>
        <option *ngFor="let n of [1, 2, 3, 4]" [value]="n">{{ n }}</option>
      </select>

      <select [(ngModel)]="nouvellePersonne.profil" name="profil" required>
        <option value="" disabled selected>Profil</option>
        <option value="timide">Timide</option>
        <option value="réservé">Réservé</option>
        <option value="à l’aise">À l’aise</option>
      </select>

      <input
        type="number"
        [(ngModel)]="nouvellePersonne.age"
        name="age"
        placeholder="Âge"
        min="1"
        max="99"
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
    input, select, label {
      margin-right: 0.5rem;
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
    genre: 'masculin',
    aisanceFrancais: 1,
    ancienDWWM: false,
    niveauTechnique: 1,
    profil: 'timide',
    age: 18
  };

  @Output() nouvelleListe = new EventEmitter<{ nom: string; personnes: Personne[] }>();

  ajouterPersonne() {
    const nom = this.nouvellePersonne.nom.trim();
    if (nom.length < 4 || nom.length > 49) return;

    this.personnes.push({ ...this.nouvellePersonne });

    this.nouvellePersonne = {
      nom: '',
      genre: 'masculin',
      aisanceFrancais: 1,
      ancienDWWM: false,
      niveauTechnique: 1,
      profil: 'timide',
      age: 18
    };
  }

  onSubmit() {
    const nom = this.nomListe.trim();
    if (nom.length < 4 || nom.length > 49) return;

    this.nouvelleListe.emit({
      nom,
      personnes: this.personnes
    });

    this.nomListe = '';
    this.personnes = [];
  }
}
