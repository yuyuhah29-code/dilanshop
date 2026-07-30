// Dilan Shop — backend API
// Handles: admin login, product CRUD, and photo uploads (proxied to ImgBB).

require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const FormData = require('form-data');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Serve the website itself (index.html, admin.html, css/, js/) from this same server,
// so you only have to deploy one thing.
app.use(express.static(__dirname));

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 } });

// ---------- Config (set these as environment variables, never hardcode) ----------
const {
  MONGODB_URI,       // MongoDB Atlas connection string
  JWT_SECRET,        // any long random string
  ADMIN_PASSWORD,    // your chosen admin password
  IMGBB_API_KEY,     // your ImgBB key
  PORT = 3000
} = process.env;

if (!MONGODB_URI || !JWT_SECRET || !ADMIN_PASSWORD || !IMGBB_API_KEY) {
  console.error('Missing required environment variables. Check your .env file / Render env settings.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// ---------- Product schema ----------
const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  brand: String,
  price: Number,
  category: String,
  icon: String,
  accent: String,
  bestseller: { type: Boolean, default: false },
  image: String // ImgBB URL
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// ---------- Auth middleware ----------
function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing token' });
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// ---------- Routes ----------

// Login
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Incorrect password' });
  }
  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '12h' });
  res.json({ token });
});

// Get all products (public — the storefront reads this)
app.get('/api/products', async (req, res) => {
  const products = await Product.find().sort({ createdAt: 1 });
  res.json(products);
});

// Upload a photo (admin only) — proxies to ImgBB so the API key stays server-side
app.post('/api/upload', requireAuth, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image provided' });
  try {
    const form = new FormData();
    form.append('image', req.file.buffer.toString('base64'));

    const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: form
    });
    const data = await imgbbRes.json();
    if (!data.success) return res.status(502).json({ error: 'ImgBB upload failed' });
    res.json({ url: data.data.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Create product (admin only)
app.post('/api/products', requireAuth, async (req, res) => {
  try {
    const last = await Product.findOne().sort({ createdAt: -1 });
    let nextNum = 1;
    if (last) {
      const n = parseInt((last.id || '').replace(/\D/g, ''), 10);
      if (!isNaN(n)) nextNum = n + 1;
    }
    const id = 'p' + String(nextNum).padStart(2, '0');
    const product = await Product.create({ ...req.body, id });
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not create product' });
  }
});

// Update product (admin only)
app.put('/api/products/:id', requireAuth, async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not update product' });
  }
});

// Delete product (admin only)
app.delete('/api/products/:id', requireAuth, async (req, res) => {
  try {
    const result = await Product.findOneAndDelete({ id: req.params.id });
    if (!result) return res.status(404).json({ error: 'Product not found' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not delete product' });
  }
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));