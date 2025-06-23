import { Personne } from './personne.model';

export interface Liste {
  id: number;
  nom: string;
  tirages: number;
  personnes: Personne[];
}
