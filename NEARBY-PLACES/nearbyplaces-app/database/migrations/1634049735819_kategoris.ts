import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Kategoris extends BaseSchema {
  protected tableName = 'kategoris'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.enum('nama_kategori',['Sekolah Dasar', 'Sekolah Menengah Pertama', 'Sekolah Menengah Atas', 'Sekolah Menengah Kejuruan', 'Tempat Ibadah', 'Rumah Sakit', 'Puskesmas', 'Kantor Pemerintahan']).notNullable()

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
