
const express = require('express');
const connection = require('./createDatabase.js');//crear un objeo en la base de datos  
const app = express();

app.use(express.json());

let usersDb = [  
  { id: 1, name: 'Product 1', description: 'This is the first product' },
  { id: 2, name: 'Product 2', description: 'This is the second product' },
  { cc: 39785959, name :"Administrador 1", pass :39785959, userType : "admin"},
  { cc: 1022972666, name :"Proveedor 1", pass :1022972666, userType : "proveedor"},
  //{ cc: 3208576038,name: "Proveedor 2",pass: 3208576038,userType: "proveedor"},
  { cc: 12189348,name: "Administrador 2",pass: 12189348,userType: "admin"}
];

app.get('/users', (req, res) => {
  res.send(usersDb);
});

app.get('/users/:cc', (req, res) => {
  const dataUser = usersDb.find(p => p.cc === parseInt(req.params.cc));
  if (!dataUser) return res.status(404).send('The product with the given ID was not found.');
  res.send(dataUser);
});

app.post('/users', (req, res) => {
  const dataUser = {
    cc: req.body.cc,
    name: req.body.name,
    pass: req.body.pass,
    userType : req.body.userType
  };
  //usersDb.push(dataUser);
  //res.send(dataUser);
  
  connection.query('INSERT INTO users (cc, name, pass, userType) VALUES (?, ?, ?, ?)',
  [dataUser.cc, dataUser.name, dataUser.pass, dataUser.userType],
  
  (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al insertar el usuario en la base de datos.');
    } else {
      res.send(dataUser);
    }
    //connection.end();
  });
});
 

app.put('/users/:cc', (req, res) => {
  const dataUser = usersDb.find(p => p.cc === parseInt(req.params.cc));
  if (!dataUser) return res.status(404).send('The product with the given ID was not found.');

  dataUser.name = req.body.name;
  dataUser.pass = req.body.pass;

  res.send(dataUser);
});

app.delete('/users/:cc', (req, res) => {
  const dataUser = usersDb.find(p => p.cc === parseInt(req.params.cc));
  if (!dataUser) return res.status(404).send('The product with the given ID was not found.');

  const index = usersDb.indexOf(dataUser);
  usersDb.splice(index, 1);

  res.send(dataUser);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
