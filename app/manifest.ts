import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'চৌরঙ্গী ব্লাড নেটওয়ার্ক',
    short_name: 'CBN',
    description: 'রক্ত দান করুন, জীবন বাঁচান - CBN Blood Network',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#8C1D18',
    orientation: 'portrait',
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
