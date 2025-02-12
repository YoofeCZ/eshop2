import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';
import productsRouter from './routes/products.js';
import categoriesRouter from './routes/categories.js';
import slidersRouter from './routes/sliders.js';
import uploadRouter from './routes/upload.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define allowed origins
const allowedOrigins = [
  'http://188.175.32.34:3000',
  'http://188.175.32.34:1111',
  'http://localhost:1111',
  'http://localhost:3000'
];

// CORS configuration
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization',
    'X-Total-Count',
    'Range',
    'Content-Range'
  ],
  exposedHeaders: ['Content-Range', 'X-Total-Count'],
  credentials: true
}));
app.use(express.json());

// Global middleware to handle CORS for all routes
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

// Static files middleware
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/sliders', slidersRouter);
app.use('/api/upload', uploadRouter);

app.get('/', (req, res) => {
  res.send('API funguje správně.');
});

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Databáze synchronizována.');
    app.listen(port, () => {
      console.log(`Server běží na portu ${port}`);
    });
  })
  .catch(error => {
    console.error('Chyba při synchronizaci databáze:', error);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});
