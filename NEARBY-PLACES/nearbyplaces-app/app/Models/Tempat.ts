import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Kategori from './Kategori'


export default class Tempat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public level: Array<string> = ['Kelurahan/Desa', 'Kecamatan', 'Kabupaten/Kota', 'Provinsi']

  @column()
  public name: string

  @column()
  public kemendagriId: number

  @column()
  public nama_kota:string

  @column()
  public nama_kecamatan:string

  @column()
  public nama_kelurahan:string

  @column()
  public kategoriId:number

  @column()
  public jumlah_setiap_wilayah: string

  @column()
  public latitude:number

  @column()
  public longitude:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

   @belongsTo(() => Kategori)
  public kategori: BelongsTo<typeof Kategori> 
}
