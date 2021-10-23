import { createClient } from 'redis'
import listHandler from './list-handler'

const passwordResetList = createClient({
  host: '127.0.0.1',
  port: 6379,
  prefix: 'password-reset',
})
export default listHandler(passwordResetList)
