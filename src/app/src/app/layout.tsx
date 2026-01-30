import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DELF B2 Trainer - Підготовка до іспиту DELF B2',
  description: 'Платформа для підготовки до іспиту DELF B2 з детальними поясненнями українською мовою',
  keywords: 'DELF, B2, французька мова, підготовка до іспиту, тренування',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
