const connection = require('../database/conection');

module.exports = {
    async index(request, response){
        const omg_id = request.headers.authorization;

        const incidents = await connection('incidents')
        .where('omg_id', omg_id)
        .select('*');

        return response.json(incidents);
    }
}