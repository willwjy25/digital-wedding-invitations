import { z } from 'zod';
import { brideGroomSchema } from '../bride-groom/bride-groom.schema';
import { eventSchema } from '../event/event.schema';
import { loveStoryItemSchema } from '../love-story/love-story.schema';
import { galleryItemSchema } from '../gallery/gallery.schema';
import { giftAccountSchema } from '../gift-account/gift-account.schema';
import { rsvpSchema } from '../rsvp/rsvp.schema';

const publicRsvpEntrySchema = z.object({
  id: z.string().uuid(),
  guestName: z.string(),
  attending: z.boolean(),
  guestCount: z.number().int(),
  message: z.string().optional().nullable(),
});

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
  rsvpList: z.array(publicRsvpEntrySchema),
});

export type PublicInvitation = z.infer<typeof publicInvitationSchema>;
export type PublicRsvpEntry = z.infer<typeof publicRsvpEntrySchema>;