import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
      <button type="submit">Créer</button>
    </form>
  `,
  styles: [`
    .form {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 2rem;
    }
    input {
      flex: 1;
      padding: 0.5rem;
    }
    button {
      padding: 0.5rem 1rem;
    }
  `]
})
export class FormListeComponent {
  nomListe: string = '';

  @Output() nouvelleListe = new EventEmitter<string>();

  onSubmit() {
    if (this.nomListe.trim()) {
      this.nouvelleListe.emit(this.nomListe.trim());
      this.nomListe = '';
    }
  }
}
