export interface Personne {
  nom: string; // longueur entre 4 et 49 caractères (validation dans le code)
  genre: 'masculin' | 'féminin' | 'ne se prononce pas';
  aisanceFrancais: 1 | 2 | 3 | 4;
  ancienDWWM: boolean;
  niveauTechnique: 1 | 2 | 3 | 4;
  profil: 'timide' | 'réservé' | 'à l’aise';
  age: number; // entre 1 et 99 inclus (validation dans le formulaire)
}
