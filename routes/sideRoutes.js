const express = require('express');
const sideController = require('../controllers/sideController');
const app = express.Router();

app.use(express.json());

// Ruta para obtener un usuario por su ID
app.get('/side/:nit', sideController.getSideById);
app.get('/side/', sideController.getAllSide);
app.post('/side/', sideController.createSide);
app.delete('/side/:nit', sideController.deleteSide);


module.exports = app;