"use client"
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '../components/header';
import { ProductCard } from '../components/product-card';
import Footer from '../components/footer';
import './styles/product.css'

const queryClient = new QueryClient();

const Products = () => {
  return (
    <>
      <main className="mx-auto lg:w-[1280px]">
        <Header />
        <QueryClientProvider client={queryClient}>
          <ProductCard />
        </QueryClientProvider>
        <Footer />
      </main>
    </>
  );
};

export default Products;

