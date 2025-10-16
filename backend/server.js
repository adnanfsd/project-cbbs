const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
//home routes
const homeRoutes = require('./routes/home');
app.use('/api/home', homeRoutes);
//booking routes
const bookingRoutes = require('./routes/booking');
app.use('/api/bookings', bookingRoutes);


// Test route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
