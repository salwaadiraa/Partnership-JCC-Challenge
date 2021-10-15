import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Tempat from 'App/Models/Tempat'
import axios from 'axios'

const URL = 'https://data.jabarprov.go.id/api-backend/bigdata/diskominfo/od_kode_wilayah_dan_nama_wilayah_desa_kelurahan'

enum enumLevel {
  Kota = 'Kota',
  Kecamatan = 'Kecamatan',
  Kelurahan = 'Kelurahan'
}

enum enumKategori {
  SD,  //sekolah dasar
  SMP, //sekolah menengah pertama
  SMA, //sekolah menengah atas
  SMK, //sekolah menengah kejuruan
  TI,  //tempat ibadah
  RS,  //rumah sakit
  PU,  //puskesmas
  KP,  //kantor pemerintahan
}

export default class TempatSeeder extends BaseSeeder {
  public async run () {
    console.log(`=>>> Start seeding Tempat`);

    let newPlaces = [{}]
    const getRandomPlace = async (level: enumLevel, qty:number, query:string, kategori:enumKategori) => {
      let nama_kategori: string = ""
      let name_level: string = ""
      let tempat = [{}]

      switch (kategori) {
        case 0:
          nama_kategori = 'SD'
          break;
        case 1:
          nama_kategori = 'SMP'
          break;
        case 2:
          nama_kategori = 'SMA'
          break;
        case 3:
          nama_kategori = 'SMK'
          break;
        case 4:
          nama_kategori = 'Tempat Ibadah'
          break;
        case 5:
          nama_kategori = 'Rumah Sakit'
          break;
        case 6:
          nama_kategori = 'Puskesmas'
          break;
        case 7:
          nama_kategori = 'Kantor Pemerintahan'
          break;
        default:
          console.log(kategori);
          break;
      }
      
      switch (level) {
        case 'Kota':
          name_level = 'Kota'
          break;
        case 'Kecamatan':
          name_level = 'Kecamatan'
          break;
        case 'Kelurahan':
          name_level = 'Kelurahan'
          break;

        default:
          break;  
      }

      console.log(`=>>> API : retrieving ${qty} ${nama_kategori} ${name_level} `);


      //axios
      await axios.get(URL + `?search=${query}`)
        .then(response => {
          const data_kemendagri = response.data['data']
          const max = Object.keys(data_kemendagri).length
          let index: number
          let checkName: string
          let nama_tempat: string

          //loop sejumlah qty data yang dibutuhkan
          tempat.shift()
          for (let i=0; i<qty; i++) {
            //get random location
            index = Math.floor(Math.random()* max)
            checkName = data_kemendagri[index]['kemendagri_kota_nama']
            
            //validasi checkName
            while (checkName.substr(0,4) == 'Kab.' || checkName == null) {
              index = Math.floor(Math.random() *max)
              checkName = data_kemendagri[index]['kemendagri_kota_nama']
            }

            switch (level) {
              case 'Kecamatan':
                checkName = data_kemendagri[index]['kemendagri_kecamatan_nama']
                break;
              case 'Kelurahan':
                checkName = data_kemendagri[index]['kemendagri_kelurahan_nama']
                break;
            }

            if (qty > 1) {
              nama_tempat = nama_kategori.toUpperCase() + ' ' + checkName + ' ' + (i+1)
            } else {
              nama_tempat = nama_kategori.toUpperCase() + ' ' + checkName
            }

            tempat.push({
              kemendagri_id: data_kemendagri[index]['id'],
              name: nama_tempat,
              kategori_id: kategori + 1,
              level: name_level,
              nama_kota: data_kemendagri[index]['kemendagri_kota_nama'],
              nama_kecamatan: 'Kecamatan' + data_kemendagri[index]['kemendagri_kecamatan_nama'],
              nama_kelurahan: 'Kelurahan' + data_kemendagri[index]['kemendagri_kelurahan_nama'],
              latitude: data_kemendagri[index]['latitude'],
              longitude: data_kemendagri[index]['longitude'],
            })
          }
          console.log(tempat);
        })
        .catch(error => console.log(error))
      return tempat
    }

    //let kotaKP = await getRandomPlace(enumLevel.Kota, 1, 'kota bandung', enumKategori.KP)
    //let kotaRS = await getRandomPlace(enumLevel.Kota, 4, 'kota bandung', enumKategori.RS)
    let kotaSMK = await getRandomPlace(enumLevel.Kota, 21, 'sumedang', enumKategori.SMK)
    //let kotaPU = await getRandomPlace(enumLevel.Kota, 2, 'kota sumedang', enumKategori.PU)
    //let kecKP = await getRandomPlace(enumLevel.Kota, 5, 'kota bandung', enumKategori.KP)
    let kecSMK = await getRandomPlace(enumLevel.Kota, 2, 'sumedang', enumKategori.SMK)
    //let kecTI = await getRandomPlace(enumLevel.Kota, 6, 'kota sumedang', enumKategori.TI)
    let kelSD = await getRandomPlace(enumLevel.Kota, 1, 'sumedang', enumKategori.SD)
    //let kelSMP = await getRandomPlace(enumLevel.Kota, 1, 'kota bandung', enumKategori.SMP)
    //let kelKP = await getRandomPlace(enumLevel.Kota, 1, 'kota bandung', enumKategori.KP)

    //newPlaces = [...kotaKP, ...kotaRS, ...kotaSMA, ...kecKP, ...kecPU, ...kelSD, ...kelSMP, ...kelKP]
    newPlaces = [...kotaSMK,...kecSMK, ...kelSD]
    //console.log('\n\n=========new places=========\n', newPlaces);

    try {
      console.log('===> saving to database');
      await Tempat.createMany(newPlaces)
    } catch (error) {
      console.log(error);
    }

  }
}
