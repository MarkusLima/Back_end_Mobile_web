const connection = require('../database/conection')

module.exports = {
    async index(request, response) {
        const {page = 1} = request.query;

        const [count] = await connection('incidents').count()

        //console.log(count)

        const incidents = await connection('incidents')
        .join('omgs', 'omg_id', '=', 'incidents.omg_id')
        .limit(5)
        .offset((page -1) *5)
        .select([
        'incidents.*',
        'omgs.name', 
        'omgs.email', 
        'omgs.whatsapp', 
        'omgs.city', 
        'omgs.uf']);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const omg_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            omg_id
        });

        return response.json({ id });

    },
    async del(request, response) {
        const { id } = request.params;
        const omg_id = request.headers.authorization;
        const incident = await connection('incidents')
            .where('id', id)
            .select('omg_id')
            .first();

        if (incident.omg_id !== omg_id) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }
        await connection('incidents').where('id', id).delete()

        return response.status(204).send()

    }
}