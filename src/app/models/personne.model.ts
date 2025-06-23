export interface Personne {
  nom: string;
  genre: 'MASCULIN' | 'FEMININ' | 'NE_SE_PRONONCE_PAS';
  aisanceFrancais: 1 | 2 | 3 | 4;
  ancienDWWM: boolean;
  niveauTechnique: 1 | 2 | 3 | 4;
  profil: 'TIMIDE' | 'RESERVE' | 'A_L_AISE';
  age: number;
}
