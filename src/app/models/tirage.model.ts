export interface CritereMixite {
  age?: boolean;
  ancienDwwm?: boolean;
  genre?: boolean;
  profil?: boolean;
  niveauTech?: boolean;
  aisanceFr?: boolean;
}

export class Tirage {
  constructor(
    public id: string,
    public listeId: string,
    public date: Date = new Date(),
    public criteresMixite: CritereMixite = {},
    public verrouille: boolean = false
  ) {}
}
