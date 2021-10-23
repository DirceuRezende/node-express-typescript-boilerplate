import redis from 'redis'
import listHandler from './list-handler'
const allowList = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
  prefix: 'allowlist-refresh-token:',
})
export default listHandler(allowList)
