require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const path = require('path');
const cartRouter = require('./routes/cart.js');
const methodOverride = require('method-override');


const app = express();
const PORT = 3000;

// Configure Handlebars
const hbs = exphbs.create({
    defaultLayout: "main",
    helpers: {
      gt: (a, b) => a > b, 
      sum: (a, b) => a + b,
      subtract: (a, b) => a - b,
      lt: (a, b) => a < b, 
      multiply: (a, b) => a * b,
      ifEquals: (a, b, options) => {
        if (a == b) {
          return options.fn(this); 
        }
        return options.inverse(this);
      }
    }
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware para manejar JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use
app.set('views', path.join(__dirname, 'views'));
app.use('/cart', cartRouter);
app.use('/products', require('./routes/products'));
app.use(methodOverride('_method'));

// Conection to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('🟢 Conectado a MongoDB Atlas'))
  .catch(err => console.error('🔴 Error al conectar con MongoDB:', err));



//  Main route
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Init server
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
