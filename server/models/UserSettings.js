import { BaseModel } from './BaseModel.js'

export class UserSettings extends BaseModel {
  static table = 'user_settings'
  static idColumn = 'user_id'
}