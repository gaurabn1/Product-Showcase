"use client"
import Footer from "./components/footer";
import Header from "./components/header";
import HeroSection from "./components/hero-section";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <>
      <div className="mx-auto lg:w-[1280px] h-screen">
        <Header />
        <QueryClientProvider client={queryClient}>
          <HeroSection />
        </QueryClientProvider>
        <Footer />
      </div>
    </>
  );
}
