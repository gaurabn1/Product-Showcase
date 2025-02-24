import React from 'react';

interface Message {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
}

interface MessageCardProps {
  messages: Message[];
  onDelete: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

export default function MessageCard({ messages, onDelete }: MessageCardProps) {
  return (
    <div className="block md:hidden">
      <h1 className="text-3xl font-bold mb-4">Messages</h1>
      {messages.map((message) => (
        <div key={message.id} className="border border-gray-300 p-4 mb-4 rounded-lg shadow-sm">
          <div className="flex justify-between">
            <h3 className="font-bold text-lg">
              {message.first_name} {message.last_name}
            </h3>
            <button
              className="text-red-500 border border-gray-300 py-2 px-6"
              onClick={(e) => onDelete(e, message.id)}
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
    </div>
  );
}
