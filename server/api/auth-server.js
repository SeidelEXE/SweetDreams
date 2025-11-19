import 'dotenv/config'
import http from 'http'
import crypto from 'crypto'
import { pool } from '../db/pool.js'

const PORT = Number(process.env.AUTH_SERVER_PORT || 3333)
const allowedOrigin = process.env.AUTH_CORS_ORIGIN || '*'
const allowedEmail = (process.env.AUTH_ALLOWED_EMAIL || 'seidel@example.com').toLowerCase()
const requiredPassword = process.env.AUTH_ALLOWED_PASSWORD || 'seidel123'

function writeJson(res, status, payload = {}){
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  })
  res.end(JSON.stringify(payload))
}

async function authenticateUser(email){
  const normalized = email.trim().toLowerCase()
  const [rows] = await pool.query(
    'SELECT id, email, display_name FROM users WHERE email = ? LIMIT 1',
    [normalized]
  )
  return rows[0] || null
}

const server = http.createServer(async (req, res) => {
  if(req.method === 'OPTIONS'){
    res.writeHead(204, {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    })
    res.end()
    return
  }

  if(req.method !== 'POST' || req.url !== '/api/login'){
    writeJson(res, 404, { message: 'Not found' })
    return
  }

  let body = ''
  req.on('data', chunk => { body += chunk })
  req.on('end', async () => {
    try {
      const data = body ? JSON.parse(body) : {}
      const email = (data.email || '').trim().toLowerCase()
      const password = data.password || ''

      if(!email || !password){
        writeJson(res, 400, { message: 'E-mail e senha são obrigatórios.' })
        return
      }

      if(password !== requiredPassword){
        writeJson(res, 401, { message: 'Credenciais inválidas.' })
        return
      }

      if(email !== allowedEmail){
        writeJson(res, 401, { message: 'Usuário não autorizado.' })
        return
      }

      const user = await authenticateUser(email)
      if(!user){
        writeJson(res, 401, { message: 'Usuário não encontrado no banco.' })
        return
      }

      const token = crypto.randomBytes(24).toString('hex')
      writeJson(res, 200, {
        token,
        user: {
          id: user.id,
          email: user.email,
          displayName: user.display_name || 'Sweet User'
        }
      })
    } catch (err) {
      console.error('[auth-server] erro inesperado', err)
      writeJson(res, 500, { message: 'Erro interno ao autenticar.' })
    }
  })
})

server.listen(PORT, () => {
  console.log(`[auth-server] escutando em http://localhost:${PORT}`)
})
