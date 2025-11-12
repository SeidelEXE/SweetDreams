import { BaseModel } from './BaseModel.js'

export class DimArea extends BaseModel {
  static table = 'dim_area'
  static async findBySlug(slug) {
    const rows = await this.findAll({ slug })
    return rows[0] || null
  }
}