'use client'
import Footer from '@/app/components/footer';
import Header from '@/app/components/header';
import Product from '@/app/components/product';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Page() {
  return (
    <>
      <main className="mx-auto lg:w-[1280px] h-[calc(100vh - 139px)]">
        <Header />
        <QueryClientProvider client={queryClient}>
          <Product />
        </QueryClientProvider>
        <Footer />
      </main>
    </>
  )
};

