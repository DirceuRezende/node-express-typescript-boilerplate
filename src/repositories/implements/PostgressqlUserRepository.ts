import { prisma } from '../../database/db'
import { User } from '../../entities/User'
import InternalServerError from '../../exceptions/InternalServerError'
import { UserRepository } from '../UserRepository'

export class PostgressqlUserRepository implements UserRepository {
  async getById(id: number): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      throw new InternalServerError('Unexpected Error obtain User')
    }

    return user
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
