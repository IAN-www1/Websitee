// Import required modules
const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Item = require('./models/item'); // Import your Item model

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3009;

// Serve static files (e.g., CSS, images, JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets'))); // Serve CSS from assets folder
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

// Routes
app.get('/', async (req, res) => {
  try {
    const items = await Item.find(); // Fetch items from the database
    res.render(path.join(__dirname, 'home.ejs'), { items }); // Render home.ejs directly from the root folder
  } catch (error) {
    console.error('Error fetching items', error);
    res.render(path.join(__dirname, 'home.ejs'), { items: [] }); // Render with an empty items array on error
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
