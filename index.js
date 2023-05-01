const express = require('express');
//const User = require('./models/usuarios.js'); 
const userRoutes = require('./routes/userRoutes');
const newRemissionRoutes = require('./routes/newRemissionRoutes');
const sideRoutes = require('./routes/sideRoutes');
const app = express();

app.use(express.json());

app.get('/',(req, res) => {res.send('Ready');});
app.use('/', userRoutes);
app.use('/', newRemissionRoutes);
app.use('/', sideRoutes);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));