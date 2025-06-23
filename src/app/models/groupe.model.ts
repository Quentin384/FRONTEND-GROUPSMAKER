import { Personne } from './personne.model';

/** Représente un groupe généré côté front */
export interface Groupe {
  /** Nom du groupe (ex. "Groupe 1") */
  nom: string;
  /** Membres du groupe */
  membres: Personne[];
}
