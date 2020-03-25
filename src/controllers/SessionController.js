const connection = require('../database/conection');

module.exports ={
    async create(request, response){
        const {id} = request.body;

        const omg = await connection('omgs')
        .where('id', id)
        .select('name')
        .first();

        if(!omg){
            return response.status(400).json({error: 'No OMG found with this ID'});
        }
        return response.json(omg);
    }
}