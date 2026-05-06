import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://cleanmails.online'
  return [
    { url: `${base}/tools`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/tools/spam-checker`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/tools/dns-checker`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/tools/email-verifier`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/tools/email-extractor`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/tools/csv-cleaner`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  ]
}
