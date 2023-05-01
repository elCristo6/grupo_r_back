const side = require('../models/side.js'); 

const getSideById = async (req, res) => {
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
}


const getAllSide = async (req, res) => {

    side.findAll().then(users => {
        console.log(users); // Imprimir los usuarios en la consola
        res.send(users);
      });

}

const createSide = async (req, res) => {
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
}

const deleteSide = async (req, res) => {

    const id = req.params.nit; // Obtener el ID del usuario desde la solicitud DELETE
    side.destroy({ where: { nit: id } }) // Buscar y eliminar el usuario con el ID especificado
      .then(() => {
        res.send('Siderurjica eliminada correctamente'); // Enviar una respuesta al cliente
      })
      .catch((error) => {
        console.error(error); // Imprimir cualquier error en la consola
        res.status(500).send('Ha ocurrido un error al eliminar el usuario'); // Enviar una respuesta de error al cliente
      });

}

module.exports = {
    getAllSide,
    getSideById,
    createSide,
    //updateUser,
    deleteSide,
  };
