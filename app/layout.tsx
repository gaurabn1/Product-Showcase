import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css"
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

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
  return (
    <html lang="en" className="scroll-smooth h-full" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased mx-auto h-full`}
      >
        <QueryClientProvider client={queryClient}>
          <Toaster toastOptions={{ duration: 1000 }} position="top-right" />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
