export class Utilisateur {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public role: string = 'USER',
    public lastTermsAcceptedAt?: Date | null
  ) {}
}
