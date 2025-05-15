export class Utilisateur {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public lastTermsAcceptedAt?: Date | null
  ) {}
}
