import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Sanity Studio — RFUS Kids' Corner",
  description: "Content management for the Kids' Corner website.",
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
