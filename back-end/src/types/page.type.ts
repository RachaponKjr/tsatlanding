import z, { optional } from 'zod';

export const PageCreateSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  keywords: z
    .union([
      z.string().transform((val) => [val]), // string → array
      z.array(z.string()),
    ])
    .transform((val) => (Array.isArray(val) ? val : [val]))
    .optional(),
  canonical: z.string().optional(),
  robots: z.string().default('index,follow'),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
  ogImageAlt: z.string().optional(),
  ogType: z.string().optional().default('website'),
  ogUrl: z.string().optional(),
  ogSiteName: z.string().optional(),
  ogLocale: z.string().optional().default('th_TH'),
  twitterCard: z.string().optional().default('summary_large_image'),
  twitterTitle: z.string().optional(),
  twitterDescription: z.string().optional(),
  twitterImage: z.string().optional(),
  twitterSite: z.string().optional(),
  twitterCreator: z.string().optional(),
  author: z.string().optional(),
  publisher: z.string().optional(),
  language: z.string().optional().default('th'),
  viewport: z.string().optional().default('width=device-width,initial-scale=1'),
  schemaType: z.string().optional(),
  schemaData: z.string().optional(),
  priority: z.float64().default(0.5),
  changefreq: z.string().optional().default('monthly'),
  content: z.string().optional(),
  published: z.boolean().default(false),
});

export type PageCreate = z.infer<typeof PageCreateSchema>;
