import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tempats extends BaseSchema {
  protected tableName = 'tempats'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.enum('level', ['Kelurahan', 'Kecamatan', 'Kota'] ) 
      table.string('name').notNullable()
      table.integer('kemendagri_id').notNullable
      table.integer('kategori_id').unsigned().references('id').inTable('kategoris')
      table.string('nama_kota').notNullable()
      table.string('nama_kecamatan').notNullable()
      table.string('nama_kelurahan').notNullable()
      table.string('jumlah_setiap_wilayah').notNullable()
      table.float('latitude').notNullable()
      table.float('longitude').notNullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
       table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
       table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
