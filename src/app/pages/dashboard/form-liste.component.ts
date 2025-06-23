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
        <option value="MASCULIN">Masculin</option>
        <option value="FEMININ">Féminin</option>
        <option value="NE_SE_PRONOCE_PAS">Ne se prononce pas</option>
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
        <option value="TIMIDE">Timide</option>
        <option value="RESERVE">Réservé</option>
        <option value="A_L_AISE">À l’aise</option>
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
:host {
  display: block;
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  font-family: Arial, sans-serif;
}

h3 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  color: #333;
}

.form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: end;
}

input[type="text"],
input[type="number"],
select {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  transition: border 0.2s ease-in-out;

  &:focus {
    border-color: #005fcc;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 95, 204, 0.15);
  }
}

label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  color: #444;
}

button {
  padding: 0.75rem 1.5rem;
  background-color: #005fcc;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0045a5;
  }
}

ul {
  padding-left: 1rem;
  list-style-type: disc;
  color: #333;
}

li {
  margin-bottom: 0.5rem;
}

/* 📱 Responsive amélioré */
@media (max-width: 600px) {
  :host {
    padding: 1rem;
  }

  .form {
    grid-template-columns: 1fr; /* une seule colonne sur petits écrans */
  }

  button {
    width: 100%; /* boutons pleine largeur */
  }

  h3 {
    text-align: center;
  }
}

`]

})
export class FormListeComponent {
  nomListe = '';

  personnes: Personne[] = [];

  nouvellePersonne: Personne = {
    nom: '',
    genre: 'MASCULIN',
    aisanceFrancais: 1,
    ancienDWWM: false,
    niveauTechnique: 1,
    profil: 'TIMIDE',
    age: 18
  };

  @Output() nouvelleListe = new EventEmitter<{ nom: string; personnes: Personne[] }>();

  ajouterPersonne() {
    const nom = this.nouvellePersonne.nom.trim();
    if (nom.length < 4 || nom.length > 49) return;

    this.personnes.push({ ...this.nouvellePersonne });

    this.nouvellePersonne = {
      nom: '',
      genre: 'MASCULIN',
      aisanceFrancais: 1,
      ancienDWWM: false,
      niveauTechnique: 1,
      profil: 'TIMIDE',
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
