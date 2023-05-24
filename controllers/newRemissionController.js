const Factura = require('../models/newRemission.js');
const Articulo = require('../models/detailsNewRemission.js');
const User = require('../models/usuarios.js');

const getRemissionByCC = async (req, res) => {
    const userCC = req.params.userCC;

    try {
      // Verificar si el usuario existe
      const existenteUsuario = await User.findByPk(userCC);
  
      if (!existenteUsuario) {
        return res.status(404).json({ mensaje: 'El usuario no existe' });
      }
  
      // Obtener todas las facturas asociadas al usuario
      const facturas = await Factura.findAll({
        where: { userCC: existenteUsuario.cc }, // Filtrar por el cc del usuario existente
        include: [{ model: Articulo, as: 'articulos',association: 'detailsNewRemissions'  }] // Incluir los artículos asociados a cada factura
      });
  
      res.status(200).json({ facturas });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Ocurrió un error al obtener las facturas' });
    }
}
const getAllRemission = async (req, res) => {
    Factura.findAll().then(users => {
        console.log(users); // Imprimir los usuarios en la consola
        res.send(users);
      });

}
const createRemission = async (req, res) => {
    const { id, ciudad, transportador,ccTransportador,direccion,placa, despachado, recibido,totalPeso,empresa,userCC,articulos } = req.body;  try {
        // Crear el usuario asociado a la factura
        const nuevoUsuario = await User.findByPk(userCC.cc);
        if (!nuevoUsuario) {
          return res.status(404).json({ mensaje: 'El usuario no existe' });
        }
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
          empresa,
          userCC: userCC.cc// Asociar la factura al usuario creado
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
}
const deleteRemission = async (req, res) => {
    const id = req.params.id; // Obtener el ID del usuario desde la solicitud DELETE
    Factura.destroy({ where: { id: id } }) // Buscar y eliminar el usuario con el ID especificado
      .then(() => {
        res.send('Usuario eliminado correctamente'); // Enviar una respuesta al cliente
      })
      .catch((error) => {
        console.error(error); // Imprimir cualquier error en la consola
        res.status(500).send('Ha ocurrido un error al eliminar el usuario'); // Enviar una respuesta de error al cliente
      });
    }
  module.exports = {
      getAllRemission,
      getRemissionByCC,
      createRemission,
      //updateUser,
      deleteRemission,
    };
