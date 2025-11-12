import 'dotenv/config'
import { ping } from '../db/pool.js'

async function main() {
  try {
    const result = await ping()
    console.log('[DB] Conexão OK:', result)
    process.exit(0)
  } catch (err) {
    console.error('[DB] Falha na conexão:', err.message)
    process.exit(1)
  }
}

main()