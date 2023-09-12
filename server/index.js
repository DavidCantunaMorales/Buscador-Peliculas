import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());     // to support JSON-encoded bodies

const db = mysql.createConnection({
  host: 'localhost',     // Cambia esto al host de tu base de datos
  user: 'root',    // Cambia esto a tu nombre de usuario
  password: 'rootroot', // Cambia esto a tu contraseña
  database: 'empleados' // Cambia esto al nombre de tu base de datos
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión a la base de datos MySQL establecida');
  }
});


// Ruta para guardar los datos de un empleado
app.post('/guardarDatos', (req, res) => {
  const { nombre, edad, pais, cargo, años } = req.body;

  // Realiza una inserción en la base de datos MySQL
  const sql = 'INSERT INTO empleados (nombre_emp, edad_emp, pais_emp, cargo_emp, anios_emp) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [nombre, edad, pais, cargo, años], (err, result) => {
    if (err) {
      console.error('Error al insertar datos en la base de datos:', err);
      res.status(500).json({ error: 'Error al guardar los datos en la base de datos' });
    } else {
      console.log('Datos guardados correctamente en la base de datos');
      res.status(200).json({ message: 'Datos guardados correctamente' });
    }
  });
});


// Ruta para obtener los datos de todos los empleados
app.get('/obtenerDatos', (req, res) => {
  // Realiza una consulta en la base de datos MySQL para obtener empleados
  const sql = 'SELECT * FROM empleados';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al obtener datos de la base de datos:', err);
      res.status(500).json({ error: 'Error al obtener los datos de la base de datos' });
    } else {
      console.log('Datos obtenidos correctamente de la base de datos');
      res.status(200).json(result); // Devuelve los datos obtenidos como respuesta
    }
  });
});


// Ruta para actualizar los datos de un empleado
app.put('/actualizarDatos', (req, res) => {
  const { id, nombre, edad, pais, cargo, años } = req.body;

  // Realiza una inserción en la base de datos MySQL
  const sql = 'UPDATE empleados SET nombre_emp = ?, edad_emp = ?, pais_emp = ?, cargo_emp = ?, anios_emp = ? WHERE id_emp = ?'
  db.query(sql, [nombre, edad, pais, cargo, años, id], (err, result) => {
    if (err) {
      console.error('Error al insertar datos en la base de datos:', err);
      res.status(500).json({ error: 'Error al guardar los datos en la base de datos' });
    } else {
      console.log('Datos guardados correctamente en la base de datos');
      res.status(200).json({ message: 'Datos guardados correctamente' });
    }
  });
});


app.listen(port, () => {
  console.log(`Servidor Node.js corriendo en http://localhost:${port}`);
});