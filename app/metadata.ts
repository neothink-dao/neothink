import { Metadata } from "next"

export const authMetadata: Metadata = {
  title: "Authentication | Neothink+",
  description: "Secure authentication for Neothink+ platform",
}

export const dashboardMetadata: Metadata = {
  title: "Dashboard | Neothink+",
  description: "Your personal dashboard on Neothink+",
}

export const defaultMetadata: Metadata = {
  title: "Neothink+",
  description: "Your journey to personal growth and transformation",
  keywords: ["personal growth", "transformation", "mindset", "development"],
  authors: [{ name: "Neothink DAO" }],
  creator: "Neothink DAO",
  publisher: "Neothink DAO",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://neothink.xyz"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://neothink.xyz",
    title: "Neothink+",
    description: "Your journey to personal growth and transformation",
    siteName: "Neothink+",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Neothink+",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neothink+",
    description: "Your journey to personal growth and transformation",
    images: ["/og-image.png"],
    creator: "@neothink",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
  alternates: {
    canonical: "https://neothink.xyz",
  },
}

export const metadata: Metadata = {
  title: "Neothink+",
  description: "Your journey to personal growth and transformation",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  manifest: "/manifest.json",
  themeColor: "#f97316",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Neothink",
  },
  icons: {
    apple: "/icons/icon-192x192.png",
  },
}
