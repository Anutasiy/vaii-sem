export class User {
  constructor(
    public email: string,
    public id: string,
    private token: string,
    private tokenExpirationDate: Date,
    public role: string
  ) {}

  get myToken() {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }
    return this.token;
  }

  get myRole() {
    return this.role;
  }
}
