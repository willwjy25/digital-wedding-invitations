import { z } from 'zod';
import { brideGroomSchema } from '../bride-groom/bride-groom.schema';
import { eventSchema } from '../event/event.schema';
import { loveStoryItemSchema } from '../love-story/love-story.schema';
import { galleryItemSchema } from '../gallery/gallery.schema';
import { giftAccountSchema } from '../gift-account/gift-account.schema';
import { rsvpSchema } from '../rsvp/rsvp.schema';

export const publicInvitationSchema = z.object({
  tenantSlug: z.string(),
  brideGroom: brideGroomSchema.nullable(),
  events: z.array(eventSchema),
  loveStory: z.array(loveStoryItemSchema),
  gallery: z.array(galleryItemSchema),
  giftAccounts: z.array(giftAccountSchema),
  guest: z
    .object({
      id: z.string().uuid(),
      name: z.string(),
      slug: z.string(),
    })
    .nullable(),
  rsvp: rsvpSchema.nullable(),
});

export type PublicInvitation = z.infer<typeof publicInvitationSchema>;