const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reserva'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado a MySQL');
});

// Endpoint para obtener pedidos
app.get('/api/pedidos', (req, res) => {
  db.query('SELECT * FROM pedidos', (error, results) => {
    if (error) return res.status(500).json({ error: 'Error al obtener pedidos.' });
    res.json(results);
  });
});

// Endpoint para agregar un nuevo pedido
app.post('/api/pedidos', (req, res) => {
  const nuevoPedido = req.body;

  // Validar que se incluyan los datos necesarios
  if (!nuevoPedido.modelo || !nuevoPedido.direccion || !nuevoPedido.tiempo || !nuevoPedido.costo || !nuevoPedido.descripcion) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  // Insertar el nuevo pedido en la base de datos
  const query = 'INSERT INTO pedidos (modelo, direccion, tiempo, costo, descripcion) VALUES (?, ?, ?, ?, ?)';
  const values = [nuevoPedido.modelo, nuevoPedido.direccion, nuevoPedido.tiempo, nuevoPedido.costo, nuevoPedido.descripcion];

  db.query(query, values, (error, results) => {
      if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Error al agregar el pedido.' });
      }
      nuevoPedido.id = results.insertId; // Obtener el ID generado
      res.status(201).json(nuevoPedido);
  });
});

app.post('/api/usuarios', (req, res) => {
  const { nombre, correo, contrasena } = req.body;

  // Verificar si los datos están llegando correctamente
  console.log('Datos recibidos en el servidor:', req.body);

  if (!nombre || !correo || !contrasena) {
    console.log('Faltan datos: nombre, correo o contraseña');
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  // Verificar si ya existe un usuario con el mismo correo
  const checkUserQuery = 'SELECT * FROM usuarios WHERE correo = ?';
  db.query(checkUserQuery, [correo], (error, results) => {
    if (error) {
      console.log('Error al verificar el correo:', error);
      return res.status(500).json({ error: 'Error al verificar el correo.' });
    }

    if (results.length > 0) {
      console.log('El correo ya está en uso');
      return res.status(400).json({ error: 'El correo ya está en uso.' });
    }

    // Si no existe, insertar el nuevo usuario
    const insertUserQuery = 'INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)';
    db.query(insertUserQuery, [nombre, correo, contrasena], (error, results) => {
      if (error) {
        console.log('Error al registrar el usuario:', error);
        return res.status(500).json({ error: 'Error al registrar el usuario.' });
      }

      console.log('Usuario registrado exitosamente:', results);
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    });
  });
});

// Endpoint para iniciar sesión
app.post('/api/login', (req, res) => {
  const { correo, contrasena } = req.body;

  // Verificar que el usuario exista y que la contraseña sea correcta
  const query = 'SELECT nombre FROM usuarios WHERE correo = ? AND contrasena = ?';
  db.query(query, [correo, contrasena], (error, results) => {
    if (error) {
      console.log('Error en la consulta:', error);
      return res.status(500).json({ error: 'Error al verificar el usuario.' });
    }

    if (results.length > 0) {
      const nombre = results[0].nombre;
      console.log('Usuario autenticado:', nombre);
      res.status(200).json({ message: 'Inicio de sesión exitoso', nombre });
    } else {
      res.status(401).json({ error: 'Correo o contraseña incorrectos.' });
    }
  });
});



// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

