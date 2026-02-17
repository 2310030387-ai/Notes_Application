import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { connectDB } from '../db/connect.js';
import authRouter from '../routes/authRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, "../../dist")));
app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true,
}))

connectDB();
app.use('/api/auth', authRouter);
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the dist folder
const distPath = path.join(__dirname, '../../dist');
app.use(express.static(distPath));

// Serve index.html for all routes (SPA fallback)
app.get('/*name', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});