import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Kategori from 'App/Models/Kategori'

export default class KategoriSeeder extends BaseSeeder {
  public async run () {
    await Kategori.createMany([
      { nama_kategori: "Sekolah Dasar"},
      { nama_kategori: "Sekolah Menengah Pertama"},
      { nama_kategori: "Sekolah Menengah Atas"},
      { nama_kategori: "Sekolah Menengah Kejuruan"},
      { nama_kategori: "Tempat Ibadah"},
      { nama_kategori: "Rumah Sakit"},
      { nama_kategori: "Puskesmas"},
      { nama_kategori: "Kantor Pemerintahan"},
    ])

  }
}
