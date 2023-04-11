const express = require('express');
const User = require('../models/newRemission.js'); 
//const User = require('../models/detailsNewRemission.js');
const app = express.Router();

app.use(express.json());

app.get('/', (req, res) => {
  //res.send(usersDb);
  User.findAll().then(users => {
    console.log(users); // Imprimir los usuarios en la consola
    res.send(users);
  });
});

app.get('/:id', (req, res) => {
  const id = req.params.id; // Obtener el ID del usuario desde la solicitud GET
  User.findOne({ where: { id: id } }) // Buscar el usuario con el ID especificado
    .then((user) => {
      if (user) {
        res.send(user); // Enviar el usuario encontrado como respuesta
      } else {
        res.status(404).send('Usuario no encontrado'); // Enviar una respuesta de error al cliente si no se encontró el usuario
      }
    })
    .catch((error) => {
      console.error(error); // Imprimir cualquier error en la consola
      res.status(500).send('Ha ocurrido un error al buscar el usuario'); // Enviar una respuesta de error al cliente
    });
});

app.post('/', (req, res) => {
  User.create({
    id: req.body.id,
    ciudad: req.body.ciudad,
    transportador: req.body.transportador,
    ccTransportador: req.body.ccTransportador,
    direccion: req.body.direccion,
    placa: req.body.placa,
    //producto: req.body.producto,
    //cantidad: req.body.cantidad,
    //descripcion: req.body.descripcion,
    despachado: req.body.despachado,
    recibido: req.body.recibido,
    totalPeso: req.body.totalPeso,
  })
    .then(() => {
      res.send('Usuario creado correctamente'); // Enviar una respuesta al cliente
    })
    .catch((error) => {
      console.error(error); // Imprimir cualquier error en la consola
      res.status(500).send('Ha ocurrido un error al crear el usuario'); // Enviar una respuesta de error al cliente
    });
});
 

app.put('/:cc', (req, res) => {
  const cc = req.params.cc; // Obtener el ID del usuario desde la solicitud PUT
  User.update(
    { name: req.body.name, pass: req.body.pass,userType: req.body.userType},
    { where: { cc: cc } } // Buscar y actualizar el usuario con el ID especificado
  )
    .then(() => {
      res.send('Usuario actualizado correctamente'); // Enviar una respuesta al client
    })
    .catch((error) => {
      console.error(error); // Imprimir cualquier error en la consola
      res.status(500).send('Ha ocurrido un error al actualizar el usuario'); // Enviar una respuesta de error al cliente
    });
  
});

app.delete('/:cc', (req, res) => {
  const id = req.params.cc; // Obtener el ID del usuario desde la solicitud DELETE
  User.destroy({ where: { cc: id } }) // Buscar y eliminar el usuario con el ID especificado
    .then(() => {
      res.send('Usuario eliminado correctamente'); // Enviar una respuesta al cliente
    })
    .catch((error) => {
      console.error(error); // Imprimir cualquier error en la consola
      res.status(500).send('Ha ocurrido un error al eliminar el usuario'); // Enviar una respuesta de error al cliente
    });
});

module.exports = app;