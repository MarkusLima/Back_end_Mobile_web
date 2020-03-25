const express = require('express');

const OmgController = require('./controllers/OmgControllers');
const IncidentsController = require('./controllers/IncidentsControllers');
const ProfileController = require('./controllers/ProfileController');
const SessionController =require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create)

routes.post('/omgs', OmgController.create);
routes.get('/omgs', OmgController.index);

routes.get('/profile', ProfileController.index);

routes.post('/incidents', IncidentsController.create);
routes.get('/incidents', IncidentsController.index);
routes.delete('/incidents/:id', IncidentsController.del);



module.exports = routes;