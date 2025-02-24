'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Pagination from "@/app/products/components/pagination";

interface Message {
  id: string;
  email: string;
}

export default function MessageTable() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1 //smaller screens
  const itemsPerPageLarger = 1 //larger screens
  const totalPages = Math.ceil(messages.length / itemsPerPage); //smaller screns
  const totalPagesLarger = Math.ceil(messages.length / itemsPerPageLarger); //smaller screns

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
    async function fetchMessages() {
      try {
        const res = await axios.get("http://localhost:5000/subscriptions");
        setMessages(res.data);
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    }
    fetchMessages();
  }, []);


  async function handleDelete(e: React.MouseEvent<HTMLButtonElement>, id: string) {
    e.preventDefault();
    const confirmDelete = window.confirm("Are you sure you want to delete this message?")
    if (!confirmDelete) return
    try {
      const res = await axios.delete("http://localhost:5000/subscriptions/" + id);
      if (res.status === 200) {
        setMessages(messages.filter((message) => message.id !== id));
        toast.success("Message deleted successfully")
      }
    } catch (error) {
      console.log("Error deleting the message:", error);
      toast.error("Error deleting the message")
    }
  }

  return (
    <main>
      <div className="w-full lg:container mx-auto mt-8 hidden md:table">
        <h1 className="text-3xl font-bold mb-4">Subscriptions</h1>
        <table className=" w-1/2 border-collapse table-auto">
          <thead>
            <tr className="bg-gray-300 text-left">
              <th>ID</th>
              <th>EMAIL</th>
              <td>ACTION</td>
            </tr>
          </thead>
          <tbody>
            {
              currentItemsLarger.map((message: Message) => (
                <tr key={message.id} className="border border-gray-300 even:bg-gray-200">
                  <td>{message.id}</td>
                  <td>{message.email}</td>
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
        <div className="w-1/2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPagesLarger}
            onPageChange={handlePageChangeLarger}
          />
        </div>
      </div>
      <div className="block md:hidden">
        <h1 className="text-3xl font-bold mb-4">Subscriptions</h1>
        {currentItems.map((message: Message) => (
          <div key={message.id} className="border border-gray-300 p-4 mb-4 rounded-lg shadow-sm">
            <div className="flex justify-between">
              <h3 className="font-bold text-lg">{message.id}</h3>
              <button
                className="text-red-500 border border-gray-300 py-2 px-6"
                onClick={(e) => handleDelete(e, message.id)}
              >
                Delete
              </button>
            </div>
            <p className="text-gray-700">Email: {message.email}</p>
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
