import mysql from 'mysql2/promise'
import { dbConfig } from './config.js'

export const pool = mysql.createPool(dbConfig)

export async function ping() {
  const conn = await pool.getConnection()
  try {
    await conn.ping()
    return true
  } finally {
    conn.release()
  }
}