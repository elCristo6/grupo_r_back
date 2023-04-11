const express = require('express');
//const User = require('./models/usuarios.js'); 
const userRoutes = require('./routes/userRoutes');
const newRemissionRoutes = require('./routes/newRemissionRoutes');
const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/newRemission', newRemissionRoutes);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));