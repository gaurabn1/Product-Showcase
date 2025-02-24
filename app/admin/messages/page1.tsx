'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Pagination from "@/app/products/components/pagination";
import Verify_token, { AccessPageProps } from "../verify_token";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Message {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
}

export default function MessageTable() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2 //smaller screens
  const itemsPerPageLarger = 5 //larger screens
  const totalPages = Math.ceil(messages.length / itemsPerPage); //smaller screns
  const totalPagesLarger = Math.ceil(messages.length / itemsPerPageLarger); //smaller screns
  const router = useRouter();

  // Smaller Screens
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = messages.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  // Larger Screens
  const startIndexLarger = (currentPage - 1) * itemsPerPageLarger;
  const endIndexLarger = startIndexLarger + itemsPerPageLarger;
  const currentItemsLarger = messages.slice(startIndexLarger, endIndexLarger);

  const handlePageChangeLarger = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }


  useEffect(() => {
    async function verify_token() {
      const access = localStorage.getItem('access')
      const isAuthenticated = await Verify_token({ access } as AccessPageProps)
      if (!isAuthenticated) {
        router.push('/admin/auth/login')
      }
    }
    verify_token()
  }, [router])


  useEffect(() => {
    async function fetchMessages() {
      try {
        const access = localStorage.getItem('access')
        const res = await axios.get("http://localhost:8000/api/contacts/", {
          headers: {
            'Authorization': `Bearer ${access}`
          }
        });
        setMessages(res.data);
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    }
    fetchMessages();
  }, []);

  async function handleDelete(e: React.MouseEvent<HTMLButtonElement>, id: string) {
    e.preventDefault();
    const access = localStorage.getItem('access')
    const confirmDelete = window.confirm("Are you sure you want to delete this message?")
    if (!confirmDelete) return
    try {
      const res = await axios.delete("http://localhost:8000/api/contact/" + id + "/delete/", {
        headers: {
          'Authorization': `Bearer ${access}`
        }
      });
      if (res.status === 201) {
        setMessages(messages.filter((message) => message.id !== id));
        toast.success('Message deleted successfully')
      }
    } catch (error) {
      toast.error("Error deleting the message")
      console.log("Error deleting the message:", error);
    }
  }

  return (
    <main>
      <div className="lg:container mx-auto mt-8 hidden md:table">
        <h1 className="text-3xl font-bold mb-4">Messages</h1>
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-300 text-left">
              <th className="text-center">ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>EMAIL</th>
              <th className="text-center">SUBJECT</th>
              <th className="text-center">MESSAGE</th>
              <td>ACTION</td>
            </tr>
          </thead>
          <tbody>
            {
              currentItemsLarger.map((message: Message) => (
                <tr key={message.id} className="border border-gray-300 even:bg-gray-200">
                  <td className="text-center">{message.id}</td>
                  <td>{message.first_name}</td>
                  <td>{message.last_name}</td>
                  <td>{message.email}</td>
                  <td className="text-center">
                    <Popover>
                      <PopoverTrigger>
                        <p className="cursor-pointer text-blue-500 border border-gray-300 py-2 px-6 my-1">View</p>
                      </PopoverTrigger>
                      <PopoverContent>
                        <p className="w-fit">{message.subject}</p>
                      </PopoverContent>
                    </Popover>
                  </td>
                  <td className="w-1/4 text-center">
                    <Popover>
                      <PopoverTrigger>
                        <p className="cursor-pointer text-blue-500 border border-gray-300 py-2 px-6 my-1">View</p>
                      </PopoverTrigger>
                      <PopoverContent>
                        <p className="w-fit">{message.message}</p>
                      </PopoverContent>
                    </Popover>
                  </td>
                  <td>
                    <button
                      className="text-red-500 border border-gray-300 py-2 px-6 my-1"
                      onClick={(e) => handleDelete(e, message.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPagesLarger}
          onPageChange={handlePageChangeLarger}
        />
      </div>
      <div className="block md:hidden">
        <h1 className="text-3xl font-bold mb-4">Messages</h1>
        {currentItems.map((message: Message) => (
          <div key={message.id} className="border border-gray-300 p-4 mb-4 rounded-lg shadow-sm">
            <div className="flex justify-between">
              <h3 className="font-bold text-lg">{message.first_name} {message.last_name}</h3>
              <button
                className="text-red-500 border border-gray-300 py-2 px-6"
                onClick={(e) => handleDelete(e, message.id)}
              >
                Delete
              </button>
            </div>
            <p className="text-gray-700">Email: {message.email}</p>
            <p className="font-semibold mt-2">Subject:</p>
            <p>{message.subject}</p>
            <p className="font-semibold mt-2">Message:</p>
            <p>{message.message}</p>
          </div>
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
}
