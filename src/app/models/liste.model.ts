import { Personne } from './personne.model';

export interface Liste {
  nom: string;
  tirages: number;
  personnes: Personne[];
}
