'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Pagination from '@/app/products/components/pagination';
import Verify_token, { AccessPageProps } from '../verify_token';
import { useRouter } from 'next/navigation';
import { useContacts } from '@/app/hooks/fetch-contacts';
import MessageTable from './components/MessageTable';
import MessageCard from './components/MessageCard';
import { LoadingAnimation } from '@/app/components/ui/Loading-animation';


export default function MessageList() {
  const { data: messages = [], isLoading, isError, refetch } = useContacts();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Smaller screens
  const itemsPerPageLarger = 5; // Larger screens
  const totalPages = Math.ceil((messages?.length || 0) / itemsPerPage);
  const totalPagesLarger = Math.ceil((messages?.length || 0) / itemsPerPageLarger);
  const router = useRouter();

  // Pagination Logic for smaller screens
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = messages.slice(startIndex, endIndex);

  // Pagination Logic for larger screens
  const startIndexLarger = (currentPage - 1) * itemsPerPageLarger;
  const endIndexLarger = startIndexLarger + itemsPerPageLarger;
  const currentItemsLarger = messages.slice(startIndexLarger, endIndexLarger);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= (window.innerWidth >= 768 ? totalPagesLarger : totalPages)) {
      setCurrentPage(newPage);
    }
  };

  async function handleDelete(e: React.MouseEvent<HTMLButtonElement>, id: string) {
    e.preventDefault();
    const access = localStorage.getItem('access');
    const confirmDelete = window.confirm('Are you sure you want to delete this message?');
    if (!confirmDelete) return;
    try {
      const res = await axios.delete(`http://localhost:8000/api/contact/${id}/delete/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      if (res.status === 201) {
        toast.success('Message deleted successfully');
        refetch(); // Refresh the messages list
      }
    } catch (error) {
      toast.error('Error deleting the message');
      console.log('Error deleting the message:', error);
    }
  }

  useEffect(() => {
    async function verifyToken() {
      const access = localStorage.getItem('access');
      const isAuthenticated = await Verify_token({ access } as AccessPageProps);
      if (!isAuthenticated) {
        router.push('/admin/auth/login');
      }
    }
    verifyToken();
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
    return (
      <main>
        <div className="lg:container mx-auto mt-8 text-center">
          <p className="text-red-500">Error loading messages. Please try again later.</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <MessageTable messages={currentItemsLarger} onDelete={handleDelete} />
      <MessageCard messages={currentItems} onDelete={handleDelete} />
      <div className="lg:container mx-auto">
        <Pagination
          currentPage={currentPage}
          totalPages={window.innerWidth >= 768 ? totalPagesLarger : totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
}
