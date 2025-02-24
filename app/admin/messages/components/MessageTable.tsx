import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
}

interface MessageTableProps {
  messages: Contact[];
  onDelete: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

export default function MessageTable({ messages, onDelete }: MessageTableProps) {
  return (
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
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
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
                  <PopoverContent>{message.subject}</PopoverContent>
                </Popover>
              </td>
              <td className="w-1/4 text-center">
                <Popover>
                  <PopoverTrigger>
                    <p className="cursor-pointer text-blue-500 border border-gray-300 py-2 px-6 my-1">View</p>
                  </PopoverTrigger>
                  <PopoverContent>{message.message}</PopoverContent>
                </Popover>
              </td>
              <td>
                <button
                  className="text-red-500 border border-gray-300 py-2 px-6 my-1"
                  onClick={(e) => onDelete(e, message.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
