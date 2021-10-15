import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//import Database from '@ioc:Adonis/Lucid/Database'
import Tempat from 'App/Models/Tempat'

export default class NearbyysController {

    public async search ({request, response}: HttpContextContract) {
    try {
        const tempat = await Tempat.query()
            
            
        const payload = request.body()
        let query_kategori 
        `SELECT *
        FROM(
            SELECT
                id,
                name,
                kategori_id,
                nama_kota,
                nama_kecamatan,
                nama_kelurahan,
                latitude,
                longitude,
                (6371 * acos(
                    cos(radians(${payload.latitude})) * cos(radians(latitude)) * cos(
                        radians(longitude) - radians(${payload.longitude}) 
                    ) + sin(radians(${payload.latitude})) * sin(radians(latitude))
                )) AS distances
            FROM tempats
        ) AS al
        WHERE
            distances < 5 ${query_kategori}
        ORDER BY
            distances`

        return response.ok({ message : 'success', data: tempat})

        } catch (error) {
        if (error.messages) {
            return response.unprocessableEntity({ message: 'failed', error: error.messages})
        } else {
            return response.unprocessableEntity({ message: 'failed', error: error.message})
        }
    } 
    } 
}
