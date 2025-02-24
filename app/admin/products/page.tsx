'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Verify_token, { AccessPageProps } from '../verify_token';
import Pagination from '@/app/products/components/pagination';
import { useProducts } from '@/app/hooks/fetch-products';
import { LoadingAnimation } from '@/app/components/ui/Loading-animation';
import ProductTable from './components/ProductTable';
import ProductCard from './components/ProductCard';

export default function ProductList() {
  const { data: products = [], isLoading, error } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Smaller screens
  const itemsPerPageLarger = 5; // Larger screens
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const totalPagesLarger = Math.ceil(products.length / itemsPerPageLarger);
  const router = useRouter();

  // Pagination Logic for smaller screens
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = products.slice(startIndex, endIndex);

  // Pagination Logic for larger screens
  const startIndexLarger = (currentPage - 1) * itemsPerPageLarger;
  const endIndexLarger = startIndexLarger + itemsPerPageLarger;
  const currentItemsLarger = products.slice(startIndexLarger, endIndexLarger);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    async function verify_token() {
      const access = localStorage.getItem('access');
      const isAuthenticated = await Verify_token({ access } as AccessPageProps);
      if (!isAuthenticated) {
        router.push('/admin/auth/login');
      }
    }
    verify_token();
  }, [router]);

  if (isLoading) return <LoadingAnimation />;
  if (error) return <p>Error loading products.</p>;

  return (
    <main>
      <ProductTable products={currentItemsLarger} />
      <ProductCard products={currentItems} />
      <Pagination
        currentPage={currentPage}
        totalPages={window.innerWidth >= 768 ? totalPagesLarger : totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
}
