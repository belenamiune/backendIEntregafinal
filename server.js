require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const app = express();
const PORT = 3000;

// Configurar Handlebars
const hbs = exphbs.create({
    helpers: {
      gt: (a, b) => a > b, // Compara si a es mayor que b
      sum: (a, b) => a + b, // Helper para sumar
      subtract: (a, b) => a - b,
      lt: (a, b) => a < b, // Helper para restar
    }
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware para manejar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use
app.use('/products', require('./routes/products'));


// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('🟢 Conectado a MongoDB Atlas'))
  .catch(err => console.error('🔴 Error al conectar con MongoDB:', err));

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
