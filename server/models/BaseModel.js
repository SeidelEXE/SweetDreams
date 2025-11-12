import { pool } from '../db/pool.js'

export class BaseModel {
  static table = null
  static idColumn = 'id'

  static async findById(id) {
    const [rows] = await pool.query(`SELECT * FROM ${this.table} WHERE ${this.idColumn} = ? LIMIT 1`, [id])
    return rows[0] || null
  }

  static async findAll(where = {}, options = {}) {
    const { orderBy, limit, offset } = options
    const keys = Object.keys(where)
    const whereSql = keys.length ? 'WHERE ' + keys.map(k => `${k} = ?`).join(' AND ') : ''
    const params = keys.map(k => where[k])
    const orderSql = orderBy ? ` ORDER BY ${orderBy}` : ''
    const limitSql = typeof limit === 'number' ? ` LIMIT ${limit}` : ''
    const offsetSql = typeof offset === 'number' ? ` OFFSET ${offset}` : ''
    const [rows] = await pool.query(`SELECT * FROM ${this.table} ${whereSql}${orderSql}${limitSql}${offsetSql}`, params)
    return rows
  }

  static async insert(data) {
    const cols = Object.keys(data)
    const placeholders = cols.map(() => '?').join(', ')
    const values = cols.map(k => data[k])
    const sql = `INSERT INTO ${this.table} (${cols.join(', ')}) VALUES (${placeholders})`
    const [res] = await pool.query(sql, values)
    return res.insertId
  }

  static async update(id, data) {
    const cols = Object.keys(data)
    if (!cols.length) return false
    const setSql = cols.map(k => `${k} = ?`).join(', ')
    const values = cols.map(k => data[k])
    const sql = `UPDATE ${this.table} SET ${setSql} WHERE ${this.idColumn} = ?`
    const [res] = await pool.query(sql, [...values, id])
    return res.affectedRows > 0
  }

  static async delete(id) {
    const [res] = await pool.query(`DELETE FROM ${this.table} WHERE ${this.idColumn} = ?`, [id])
    return res.affectedRows > 0
  }
}