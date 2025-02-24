import React from 'react';

interface Subscription {
  id: string;
  email: string;
}

interface SubscriptionTableProps {
  subscriptions: Subscription[];
  onDelete: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

export default function SubscriptionTable({ subscriptions, onDelete }: SubscriptionTableProps) {
  return (
    <div className="w-full lg:container mx-auto mt-8 hidden md:table">
      <h1 className="text-3xl font-bold mb-4">Subscriptions</h1>
      <table className="w-1/2 border-collapse table-auto">
        <thead>
          <tr className="bg-gray-300 text-left">
            <th className="text-center">ID</th>
            <th className="text-center">EMAIL</th>
            <td>ACTION</td>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((message) => (
            <tr key={message.id} className="border border-gray-300 even:bg-gray-200">
              <td className="text-center">{message.id}</td>
              <td className="text-center">{message.email}</td>
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
