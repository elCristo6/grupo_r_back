// archivo database.js

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '91120152349.',
  database: 'database_r'
});

async function getAllUsers() {
  const [rows, fields] = await connection.query('SELECT * FROM users');
  return rows;
}
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }
  console.log('Conexión establecida con ID: ' + connection.threadId);
});


module.exports ={
  connection,
  getAllUsers
}
