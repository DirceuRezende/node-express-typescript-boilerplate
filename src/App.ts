import dotenv from 'dotenv'
import express, { Express } from 'express'
import passport from './config/authentication-strategies'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import routes from './routes'
import errorMiddleware from './middlewares/error-middleware'
import notFoundMiddleware from './middlewares/not-found-middleware'
import logger, { stream } from './config/logger'
import { PrismaClient } from '@prisma/client'

if (process.env.NODE_ENV === 'production') {
  dotenv.config()
}

export default class App {
  private readonly app = express()
  private readonly database = new PrismaClient()
  private readonly dev =
    (process.env.NODE_ENV || 'development') === 'development'

  private middlewares() {
    this.app.use(morgan('common', { skip: () => !this.dev, stream: stream }))
    this.app.use(helmet())
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  private routes() {
    this.app.use(routes)
    this.app.all('*', notFoundMiddleware)
    this.app.use(passport.initialize())
    this.app.use(errorMiddleware)
  }

  async assertDatabaseConnection(): Promise<void> {
    try {
      await this.database.$queryRaw`select 1+1 as result`
    } catch (error) {
      logger.error(
        '[Fatal] Failed to establish connection to database! Exiting...',
      )
      logger.error(error)
      process.exit(1)
    }
  }

  public async start(): Promise<Express> {
    //await this.assertDatabaseConnection();
    this.middlewares()
    this.routes()

    return this.app
  }

  public async stop(): Promise<void> {
    //await this.database.destroy();
  }
}
