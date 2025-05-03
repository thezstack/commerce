// Ensure proper URL formatting to avoid double https:// issues
let baseUrl: string;

if (process.env.NEXT_PUBLIC_VERCEL_URL) {
  // Remove any protocol prefix if it exists
  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL.replace(/^https?:\/\//, '');
  baseUrl = `https://${vercelUrl}`;
} else {
  baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://schoolkits.org'
    : 'http://localhost:3000';
}

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*'
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  };
}
