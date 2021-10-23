import { User } from '../entities/User'

export interface UserRepository {
  getById(id: number): Promise<User>

  getByEmail(email: string): Promise<User | null>
}
