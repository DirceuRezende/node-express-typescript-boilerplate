export class User {
  public id?: number
  public name: string
  public email: string
  public password: string
  public verified_email: boolean
  public created_at?: Date
  public updated_at?: Date

  constructor(user: User) {
    this.id = user.id
    this.name = user.name
    this.email = user.email
    this.password = user.password
    this.verified_email = user.verified_email
    this.created_at = user.created_at
    this.updated_at = user.updated_at
  }
}
