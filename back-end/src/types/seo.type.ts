import z from 'zod';

const SeoSchama = z.object({
  siteName: z.string(),
  siteDescription: z.string(),
  siteUrl: z.string(),
  defaultOgImage: z.string().optional(),
  facebookUrl: z.string().optional(),
  twitterHandle: z.string().optional(),
  instagramUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  googleVerification: z.string().optional(),
  bingVerification: z.string().optional(),
  googleAnalyticsId: z.string().optional(),
  facebookPixelId: z.string().optional(),
});

export type Seo = z.infer<typeof SeoSchama>;
