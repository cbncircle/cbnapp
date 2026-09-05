import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CBN Blood Network',
  description: 'রক্ত দান করুন, জীবন বাঁচান',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
