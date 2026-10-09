import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VanVirasat | Discover Tribal India, Experience Living Heritage",
  description:
    "Explore Dungarpur and southern Rajasthan through thoughtfully curated local experiences, cultural journeys, nature trails, and community-led tourism.",
  metadataBase: new URL("https://vanvirasat.in"),
  openGraph: {
    title: "VanVirasat — Discover Tribal India",
    description:
      "Meaningful journeys. Living heritage. Local connections in Dungarpur, Rajasthan.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
