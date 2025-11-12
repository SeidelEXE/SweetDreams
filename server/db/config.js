import 'dotenv/config'

export const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER || 'seidel',
  password: process.env.MYSQL_PASSWORD || '1234',
  database: process.env.MYSQL_DATABASE || 'sweetdreams',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}