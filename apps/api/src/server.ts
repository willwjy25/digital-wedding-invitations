import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './modules/auth/auth.route';
import brideGroomRoutes from './modules/bride-groom/bride-groom.route';
import eventRoutes from './modules/event/event.route';
import loveStoryRoutes from './modules/love-story/love-story.route';
import galleryRoutes from './modules/gallery/gallery.route';
import giftAccountRoutes from './modules/gift-account/gift-account.route';
import guestRoutes from './modules/guest/guest.route';
import publicInvitationRoutes from './modules/public-invitation/public-invitation.route';
import rsvpRoutes from './modules/rsvp/rsvp.route';
import wishRoutes from './modules/wish/wish.route';
import checkinRoutes from './modules/checkin/checkin.route';

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

app.use('/api/love-story', loveStoryRoutes);

app.use('/api/gallery', galleryRoutes);

app.use('/api/gift-accounts', giftAccountRoutes);

app.use('/api/guests', guestRoutes);

app.use('/api/public', publicInvitationRoutes);

app.use('/api/rsvp', rsvpRoutes);

app.use('/api/wishes', wishRoutes);

app.use('/api/checkin', checkinRoutes);
