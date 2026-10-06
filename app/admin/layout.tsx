import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s | Gift Collection Admin' },
  description: 'Gift Collection Admin Dashboard',
  robots: 'noindex, nofollow',
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
