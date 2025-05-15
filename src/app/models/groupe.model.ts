import { Injectable } from '@angular/core';
import { Liste } from '../models/liste.model';

@Injectable({
  providedIn: 'root'
})
export class GroupesService {
  private listes: Liste[] = [
    {
      nom: 'CDA Avril 2025',
      tirages: 2,
      personnes: [
        {
          nom: 'Alice', genre: 'féminin', ancienDWWM: false,
          niveauTechnique: 2, aisanceFr: 4, profil: 'à l’aise', age: 24
        },
        {
          nom: 'Bob', genre: 'masculin', ancienDWWM: true,
          niveauTechnique: 3, aisanceFr: 3, profil: 'réservé', age: 30
        }
      ]
    }
  ];

  getListes(): Liste[] {
    return this.listes;
  }
}
