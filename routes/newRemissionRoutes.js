const express = require('express');
const Factura = require('../models/newRemission.js'); 
const Articulo = require('../models/detailsNewRemission.js');
const app = express.Router();

app.use(express.json());

app.get('/', (req, res) => {
  //res.send(usersDb);
  Factura.findAll().then(users => {
    console.log(users); // Imprimir los usuarios en la consola
    res.send(users);
  });
});

app.get('/:id', (req, res) => {
  const id = req.params.id; // Obtener el ID del usuario desde la solicitud GET
  Factura.findOne({ where: { id: id } }) // Buscar el usuario con el ID especificado
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
/*
app.post('/', (req, res) => {
  Factura.create({
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
 */
app.post('/', async (req, res) => {
  const { id, ciudad, transportador,ccTransportador,direccion,placa, despachado, recibido,totalPeso,articulos } = req.body;

  try {
    // Crear la nueva instancia de factura
    const factura = await Factura.create({
      id,
      ciudad,
      transportador,
      ccTransportador,
      direccion,
      placa,
      despachado,
      recibido,
      totalPeso,
    });
    // Crear las instancias de artículos y asociarlas con la factura
    await Promise.all(
      articulos.map(async (articulo) => {
        const { descripcion, cantidad, material } = articulo;
        await Articulo.create({
          descripcion,
          cantidad,
          material,
          newRemissionId: factura.id // Establecer la relación con la factura
        });
      })
    );

    res.status(201).json({ mensaje: 'Factura creada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Ocurrió un error al crear la factura' });
  }
});
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
app.delete('/:id', (req, res) => {
  const id = req.params.id; // Obtener el ID del usuario desde la solicitud DELETE
  Factura.destroy({ where: { id: id } }) // Buscar y eliminar el usuario con el ID especificado
    .then(() => {
      res.send('Usuario eliminado correctamente'); // Enviar una respuesta al cliente
    })
    .catch((error) => {
      console.error(error); // Imprimir cualquier error en la consola
      res.status(500).send('Ha ocurrido un error al eliminar el usuario'); // Enviar una respuesta de error al cliente
    });
});

module.exports = app;