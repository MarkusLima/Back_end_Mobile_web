const crypto = require('crypto');
const connection = require('../database/conection');

module.exports = {

    async index(request, response){
             const omgs = await connection('omgs').select('*');

             return response.json(omgs)
         },

    async create(request , response){
        const {name, email, whatsapp, city, uf} =request.body;
        const id = crypto.randomBytes(4).toString('HEX');
        await connection('omgs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
    
        return response.json({
           id
        });
    }
}