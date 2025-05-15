import { Injectable } from '@angular/core';
import { Liste } from '../../models/liste.model';

@Injectable({
  providedIn: 'root'
})
export class GroupesService {
  private listes: Liste[] = [];

  getListes(): Liste[] {
    return this.listes;
  }

  ajouterListe(nom: string): void {
    this.listes.push({
      nom,
      tirages: 0,
      personnes: []
    });
  }
}
