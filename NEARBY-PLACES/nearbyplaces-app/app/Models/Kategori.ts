import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Tempat from './Tempat'

export default class Kategori extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nama_kategori: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Tempat)
  public tempat: HasMany<typeof Tempat>
}
