const express = require('express');
const userController = require('../controllers/userController');
const app = express.Router();

app.use(express.json());

// Ruta para obtener un usuario por su ID
app.get('/users/:cc', userController.getUserById);
// Ruta para obtener todos los usuarios
app.get('/users/', userController.getAllUsers);
// Ruta para crear un nuevo usuario
app.post('/users/', userController.createUser);
// Ruta para actualizar un usuario existente
app.put('/users/:cc', userController.updateUser);
// Ruta para eliminar un usuario existente
app.delete('/users/:cc', userController.deleteUser);


module.exports = app;
