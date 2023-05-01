const express = require('express');
const Factura = require('../models/newRemission.js'); 
const Articulo = require('../models/detailsNewRemission.js');
const User = require('../models/usuarios.js');
const remiController = require('../controllers/newRemissionController');
const app = express.Router();

app.use(express.json());

app.get('/newRemission/', remiController.getAllRemission);
app.get('/newRemission/:userCC', remiController.getRemissionByCC);
app.post('/newRemission/', remiController.createRemission);
app.delete('/newRemission/:id', remiController.deleteRemission);
/*
app.put('/:id', (req, res) => {
  const id = req.params.id; // Obtener el ID del usuario desde la solicitud PUT
  Factura.update(
    { ciudad: req.body.ciudad, 
      transportador: req.body.pass,transportador, 
      ccTransportador: req.body.ccTransportador
    },
    { where: { id: id } } // Buscar y actualizar el usuario con el ID especificado
  )
    .then(() => {
      res.send('Usuario actualizado correctamente'); // Enviar una respuesta al client
    })
    .catch((error) => {
      console.error(error); // Imprimir cualquier error en la consola
      res.status(500).send('Ha ocurrido un error al actualizar el usuario'); // Enviar una respuesta de error al cliente
    });
  
});
*/

module.exports = app;