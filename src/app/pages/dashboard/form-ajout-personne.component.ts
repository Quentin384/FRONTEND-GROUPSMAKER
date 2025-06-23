import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Personne } from '../../models/personne.model';

@Component({
  selector: 'app-form-ajout-personne',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form class="form-ajout" (ngSubmit)="ajouterPersonne()">
      <input
        type="text"
        [(ngModel)]="personne.nom"
        name="nom"
        placeholder="Nom"
        required minlength="4" maxlength="49"
      />

      <select [(ngModel)]="personne.genre" name="genre" required>
        <option value="MASCULIN">Masculin</option>
        <option value="FEMININ">Féminin</option>
        <option value="NE_SE_PRONONCE_PAS">Ne se prononce pas</option>
      </select>

      <select [(ngModel)]="personne.aisanceFrancais" name="aisanceFrancais" required>
        <option *ngFor="let n of [1,2,3,4]" [value]="n">Aisance FR {{ n }}/4</option>
      </select>

      <label>
        <input
          type="checkbox"
          [(ngModel)]="personne.ancienDWWM"
          name="ancienDWWM"
        />
        Ancien DWWM
      </label>

      <select [(ngModel)]="personne.niveauTechnique" name="niveauTechnique" required>
        <option *ngFor="let n of [1,2,3,4]" [value]="n">Tech {{ n }}/4</option>
      </select>

      <select [(ngModel)]="personne.profil" name="profil" required>
        <option value="TIMIDE">Timide</option>
        <option value="RESERVE">Réservé</option>
        <option value="A_L_AISE">À l’aise</option>
      </select>

      <input
        type="number"
        [(ngModel)]="personne.age"
        name="age"
        placeholder="Âge"
        min="1" max="99"
        required
      />

      <button type="submit">Ajouter</button>
    </form>
  `,
  styles: [`
    .form-ajout {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 0.75rem;
      align-items: center;
      margin: 1.5rem 0;
    }

    .form-ajout input[type="text"],
    .form-ajout input[type="number"],
    .form-ajout select {
      padding: 0.6rem;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 0.95rem;
      width: 100%;
      box-sizing: border-box;
      transition: border 0.2s ease-in-out;
    }
    .form-ajout input:focus,
    .form-ajout select:focus {
      border-color: #005fcc;
      outline: none;
      box-shadow: 0 0 0 2px rgba(0,95,204,0.15);
    }

    .form-ajout label {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.9rem;
    }

    .form-ajout button {
      padding: 0.6rem 1.2rem;
      background-color: #005fcc;
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 0.95rem;
      cursor: pointer;
      transition: background-color 0.2s;
      grid-column: span 2;
    }
    .form-ajout button:hover {
      background-color: #0045a5;
    }

    @media (max-width: 600px) {
      .form-ajout {
        grid-template-columns: 1fr;
      }
      .form-ajout button {
        width: 100%;
      }
    }
  `]
})
export class FormAjoutPersonneComponent {
  @Input() idListe!: number;
  @Output() ajout = new EventEmitter<{ idListe: number; personne: Personne }>();

  personne: Personne = this.getDefault();

  ajouterPersonne() {
    const nom = this.personne.nom.trim();
    if (nom.length >= 4 && nom.length <= 49) {
      this.ajout.emit({ idListe: this.idListe, personne: { ...this.personne } });
      this.personne = this.getDefault();
    }
  }

  private getDefault(): Personne {
    return {
      nom: '',
      genre: 'MASCULIN',
      aisanceFrancais: 1,
      ancienDWWM: false,
      niveauTechnique: 1,
      profil: 'TIMIDE',
      age: 18
    };
  }
}
