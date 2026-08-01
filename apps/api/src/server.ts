import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './modules/auth/auth.route';
import brideGroomRoutes from './modules/bride-groom/bride-groom.route';
import eventRoutes from './modules/event/event.route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});

app.use('/api/bride-groom', brideGroomRoutes);

app.use('/api/events', eventRoutes);
