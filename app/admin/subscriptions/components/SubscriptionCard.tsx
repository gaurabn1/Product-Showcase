import React from 'react';

interface Subscription {
  id: string;
  email: string;
}

interface SubscriptionCardProps {
  subscriptions: Subscription[];
  onDelete: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

export default function SubscriptionCard({ subscriptions, onDelete }: SubscriptionCardProps) {
  return (
    <div className="block md:hidden">
      <h1 className="text-3xl font-bold mb-4">Subscriptions</h1>
      {subscriptions.map((message) => (
        <div key={message.id} className="border border-gray-300 p-4 mb-4 rounded-lg shadow-sm">
          <div className="flex justify-between">
            <h3 className="font-bold text-lg">{message.id}</h3>
            <button
              className="text-red-500 border border-gray-300 py-2 px-6"
              onClick={(e) => onDelete(e, message.id)}
            >
              Delete
            </button>
          </div>
          <p className="text-gray-700">Email: {message.email}</p>
        </div>
      ))}
    </div>
  );
}
