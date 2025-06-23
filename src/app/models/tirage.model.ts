// src/app/models/tirage.model.ts

import { Groupe } from './groupe.model';

export interface Tirage {
  id?: number; // ✅ Optionnel : utilisé dans les GET / PATCH, pas dans POST
  groupes: Groupe[];
  date: string | Date;
  valide: boolean;
}
