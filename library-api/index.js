// index.js
const fastify = require('fastify')({ logger: true });
const cors = require('fastify-cors');
const { getConnection } = require('./db');

fastify.register(cors, {
  origin: 'http://localhost:5173', // Permitir solicitudes solo desde este origen
  methods: ['GET', 'POST', 'DELETE', 'PUT'], // Métodos permitidos
});

// Ruta principal para obtener todos los libros
fastify.get('/books', async (request, reply) => {
  try {
    // sleep(5000); // Simular una demora de 5 segundos
    const conn = await getConnection();
    const rows = await conn.query('SELECT volume_id, volume_number, title, v.location_id, room, shelf,  bookcase, position  FROM volume v inner join location l on v.location_id = l.location_id');
    reply.send(rows);
    conn.end(); // Cierra la conexión
  } catch (err) {
    reply.status(500).send('Error connecting to the database');
  }
});

// Ruta para obtener un libro por su ID
fastify.get('/books/:id', async (request, reply) => {
  const { id } = request.params;
  try {
    const conn = await getConnection();
    const rows = await conn.query('SELECT * FROM volume WHERE volume_id = ?', [id]);
    reply.send(rows[0] || { message: 'Book not found' });
    conn.end();
  } catch (err) {
    reply.status(500).send('Error connecting to the database');
  }
});

// Ruta para agregar un nuevo libro
fastify.post('/books', async (request, reply) => {
  const { volume_number, title, location_id } = request.body;
  try {
    const conn = await getConnection();
    const res = await conn.query('INSERT INTO volume (volume_number, title, location_id) VALUES (?, ?, ?)', 
                                  [volume_number, title, location_id]);

    reply.status(201).send(res.insertId);
    conn.end();
  } catch (err) {
    reply.status(500).send('Error adding book');
  }
});

// Ruta para eliminar un libro por su ID
fastify.delete('/books/:id', async (request, reply) => {
  const { id } = request.params;
  try {
    const conn = await getConnection();
    const res = await conn.query('DELETE FROM volume WHERE volume_id = ?', [id]);
    if (res.affectedRows === 0) {
      reply.status(404).send({ message: 'Book not found' });
    } else {
      reply.send({ message: 'Book deleted' });
    }

    conn.end();
  } catch (err) {
    reply.status(500).send('Error deleting book');
  }
});

// ruta para actualizar un libro por su ID
fastify.put('/books/:id', async (request, reply) => {
  const { id } = request.params;
  const { volume_number, title, location_id } = request.body;
  try {
    const conn = await getConnection();
    const res = await conn.query('UPDATE volume SET volume_number = ?, title = ?, location_id = ? WHERE volume_id = ?', 
                                  [volume_number, title, location_id, id]);
    if (res.affectedRows === 0) {
      reply.status(404).send({ message: 'Book not found' });
    } else {
      reply.send({ message: 'Book updated' });
    }

    conn.end();
  } catch (err) {
    reply.status(500).send('Error updating book');
  }
});

// Ruta principal para obtener todas las ubicaciones
fastify.get('/locations', async (request, reply) => {
  try {
    const conn = await getConnection();
    const rows = await conn.query('SELECT * FROM location');
    reply.send(rows);
    conn.end();
  } catch (err) {
    reply.status(500).send('Error connecting to the database');
  }
});

// Ruta para obtener una ubicación por su ID
fastify.get('/locations/:id', async (request, reply) => {
  const { id } = request.params;
  try {
    const conn = await getConnection();
    const rows = await conn.query('SELECT * FROM location WHERE location_id = ?', [id]);
    reply.send(rows[0] || { message: 'Location not found' });
    conn.end();
  } catch (err) {
    reply.status(500).send('Error connecting to the database');
  }
});

// Ruta para agregar una nueva ubicación
fastify.post('/locations', async (request, reply) => {
  const { room, shelf, bookcase, position } = request.body;
  try {
    const conn = await getConnection();
    const res = await conn.query('INSERT INTO location (room, shelf, bookcase, position) VALUES (?, ?, ?, ?)', 
                                  [room, shelf, bookcase, position]);
    reply.status(201).send(res.insertId.toString());
    conn.end();
  } catch (err) {
    reply.status(500).send('Error adding location');
  }
});

// Ruta para eliminar una ubicación por su ID
fastify.delete('/locations/:id', async (request, reply) => {
  const { id } = request.params;
  try {
    const conn = await getConnection();
    const res = await conn.query('DELETE FROM location WHERE location_id = ?', [id]);
    if (res.affectedRows === 0) {
      reply.status(404).send({ message: 'Location not found' });
    } else {
      reply.send({ message: 'Location deleted' });
    }

    conn.end();
  } catch (err) {
    reply.status(500).send('Error deleting location');
  }
});

// Ruta para actualizar una ubicación por su ID
fastify.put('/locations/:id', async (request, reply) => {
  const { id } = request.params;
  const { name } = request.body;
  try {
    const conn = await getConnection();
    const res = await conn.query('UPDATE location SET name = ? WHERE location_id = ?', [name, id]);
    if (res.affectedRows === 0) {
      reply.status(404).send({ message: 'Location not found' });
    } else {
      reply.send({ message: 'Location updated' });
    }

    conn.end();
  } catch (err) {
    reply.status(500).send('Error updating location');
  }
});

// Iniciar el servidor en el puerto 3000
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`Server is running on http://localhost:3000`);
  } catch (err) {
    process.exit(1);
  }
};

start();
