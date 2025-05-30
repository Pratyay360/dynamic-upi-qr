import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes"; // Import ThemeProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dynamic UPI QR Code Generator | Create Instant Payment Links",
  description:
    "Generate dynamic UPI QR codes instantly for payments. Easy-to-use tool for creating personalized UPI payment links with custom amounts and notes.",
  keywords:
    "UPI, QR code, payment, India, digital payment, UPI ID, BHIM, PayTM, PhonePe",
  authors: [{ name: "Pratyay Mustafi" }],
  openGraph: {
    title: "Dynamic UPI QR Code Generator",
    description: "Generate dynamic UPI QR codes instantly for payments",
    type: "website",
  },
  robots: "index, follow",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem
          disableTransitionOnChange={false}
        >
          <main>
            {children}
          </main>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
