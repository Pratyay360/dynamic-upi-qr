import "./globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <body className="bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
