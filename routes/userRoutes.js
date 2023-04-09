const express = require('express');
const User = require('../models/usuarios.js'); 
const app = express.Router();

app.use(express.json());

app.get('/', (req, res) => {
  //res.send(usersDb);
  User.findAll().then(users => {
    console.log(users); // Imprimir los usuarios en la consola
    res.send(users);
  });
});

app.get('/:cc', (req, res) => {
  const cc = req.params.cc; // Obtener el ID del usuario desde la solicitud GET
  User.findOne({ where: { cc: cc } }) // Buscar el usuario con el ID especificado
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
    cc: req.body.cc,
    name: req.body.name,
    pass: req.body.pass,
    userType: req.body.userType,
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
/*
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));*//*
archivo que contiene las rutas de tu API en Express, que se encarga de manejar las solicitudes HTTP y comunicarse con el modelo de usuario para realizar operaciones en la base de datos.
En este archivo de controlador, se han definido las siguientes rutas HTT:GET /users: devuelve una lista de todos los usuarios almacenados en la base de datos.GET /users/:cc: devuelve un usuario específico según su número de identificación (cc).
POST /users: crea un nuevo usuario en la base de datosPUT /users/:cc: actualiza un usuario existente según su número de identificación (cc).
DELETE /users/:cc: elimina un usuario existente según su número de identificación (cc).Todas estas rutas se comunican con el modelo de usuario para realizar las operaciones necesarias en la base de datos utilizando los métodos proporcionados por Sequelize.
En resumen, el archivo que has presentado es el controlador de tu aplicación Express, que se encarga de manejar las solicitudes HTTP y comunicarse con el modelo de usuario para realizar operaciones en la base de datos.*/