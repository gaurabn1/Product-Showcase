'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css"
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  const excludeThemePages = ['/admin', '/admin/messages', '/admin/subscriptions'];
  const isExcludedPage = excludeThemePages.includes(pathname);
  return (
    <html lang="en" className="scroll-smooth h-full" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased mx-auto h-full`}
      >
        {
          !isExcludedPage ? (
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster toastOptions={{ duration: 1000 }} position="top-right" />
              {children}
            </ThemeProvider>
          ) : (
            (
              <>
                <Toaster toastOptions={{ duration: 1000 }} position="top-right" />
                {children}
              </>
            )
          )
        }
      </body>
    </html>
  );
}
