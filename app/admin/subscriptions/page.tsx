'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Pagination from '@/app/products/components/pagination';
import { useRouter } from 'next/navigation';
import { useSubscriptions } from '@/app/hooks/fetch-subscriptions';
import SubscriptionTable from './components/SubscriptionTable';
import SubscriptionCard from './components/SubscriptionCard';
import { LoadingAnimation } from '@/app/components/ui/Loading-animation';
import Verify_token, { AccessPageProps } from '../utils/verify-token';

export default function SubscriptionList() {
  const { data: messages = [], isLoading, isError } = useSubscriptions();
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const itemsPerPage = 2; // Smaller screens
  const itemsPerPageLarger = 4; // Larger screens

  const totalPages = Math.ceil(messages.length / itemsPerPage);
  const totalPagesLarger = Math.ceil(messages.length / itemsPerPageLarger);

  // Pagination Logic for smaller screens
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = messages.slice(startIndex, endIndex);

  // Pagination Logic for larger screens
  const startIndexLarger = (currentPage - 1) * itemsPerPageLarger;
  const endIndexLarger = startIndexLarger + itemsPerPageLarger;
  const currentItemsLarger = messages.slice(startIndexLarger, endIndexLarger);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await axios.delete(`http://localhost:8000/api/subscriber/${id}/delete/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
      });
      toast.success('Message deleted successfully');
    } catch (error) {
      console.error('Error deleting the message:', error);
      toast.error('Error deleting the message');
    }
  };

  useEffect(() => {
    const access = localStorage.getItem('access');
    async function verify_token() {
      const isAuthenticated = await Verify_token({ access } as AccessPageProps);
      if (!isAuthenticated) {
        router.push('/admin/auth/login');
      }
    }
    verify_token();
  }, [router]);


  if (isLoading) {
    return (
      <main>
        <div className="lg:container mx-auto mt-8 text-center">
          <LoadingAnimation />
        </div>
      </main>
    );
  }

  if (isError) {
    toast.error('Error fetching messages');
  }

  return (
    <main>
      <SubscriptionTable subscriptions={currentItemsLarger} onDelete={handleDelete} />
      <SubscriptionCard subscriptions={currentItems} onDelete={handleDelete} />
      <div className="w-full lg:w-1/2 lg:container ">
        <Pagination
          currentPage={currentPage}
          totalPages={window.innerWidth >= 768 ? totalPagesLarger : totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
}
