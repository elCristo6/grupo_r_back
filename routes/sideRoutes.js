const express = require('express');
const side = require('../models/side.js'); 
const app = express.Router();

app.use(express.json());

app.get('/', (req, res) => {
  //res.send(usersDb);
  side.findAll().then(users => {
    console.log(users); // Imprimir los usuarios en la consola
    res.send(users);
  });
});

app.get('/:nit', (req, res) => {
  const nit = req.params.nit; // Obtener el ID del usuario desde la solicitud GET
  side.findOne({ where: { nit: nit } }) // Buscar el usuario con el ID especificado
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
    side.create({
    nit: req.body.nit,
    name: req.body.name,
  })
    .then(() => {
      res.send('Usuario creado correctamente'); // Enviar una respuesta al cliente
    })
    .catch((error) => {
      console.error(error); // Imprimir cualquier error en la consola
      res.status(500).send('Ha ocurrido un error al crear el usuario'); // Enviar una respuesta de error al cliente
    });
});
 

app.put('/:nit', (req, res) => {
  const nit = req.params.nit; // Obtener el ID del usuario desde la solicitud PUT
  side.update(
    { name: req.body.name},
    { where: { nit: nit } } // Buscar y actualizar el usuario con el ID especificado
  )
    .then(() => {
      res.send('Usuario actualizado correctamente'); // Enviar una respuesta al client
    })
    .catch((error) => {
      console.error(error); // Imprimir cualquier error en la consola
      res.status(500).send('Ha ocurrido un error al actualizar el usuario'); // Enviar una respuesta de error al cliente
    });
  
});

module.exports = app;