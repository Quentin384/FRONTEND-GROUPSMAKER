import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-creer-liste',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form class="form-creer" (ngSubmit)="creerListe()">
      <input
        type="text"
        [(ngModel)]="nomListe"
        name="nomListe"
        placeholder="Nom de la nouvelle liste"
        required minlength="4" maxlength="49"
      />
      <button type="submit">Créer la liste</button>
    </form>
  `,
  styles: [`
    .form-creer {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .form-creer input {
      flex: 1;
      padding: 0.6rem;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 1rem;
      transition: border 0.2s;
    }
    .form-creer input:focus {
      border-color: #005fcc;
      outline: none;
      box-shadow: 0 0 0 2px rgba(0,95,204,0.15);
    }
    .form-creer button {
      padding: 0.75rem 1.5rem;
      background-color: #005fcc;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .form-creer button:hover {
      background-color: #0045a5;
    }
  `]
})
export class FormCreerListeComponent {
  @Output() creer = new EventEmitter<string>();
  nomListe = '';

  creerListe() {
    const nom = this.nomListe.trim();
    if (nom.length >= 4 && nom.length <= 49) {
      this.creer.emit(nom);
      this.nomListe = '';
    }
  }
}
