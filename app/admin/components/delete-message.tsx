"use client";
import React from "react";
import axios from "axios";
import { Message } from "../types/message";

interface DeleteMessageProps {
  message_id: string;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export default function DeleteMessage({ message_id, messages, setMessages }: DeleteMessageProps) {
  async function handleDelete(e: React.MouseEvent<HTMLButtonElement>, id: string) {
    e.preventDefault();
    const confirmDelete = window.confirm("Are you sure you want to delete this message?")
    if (!confirmDelete) return
    try {
      const res = await axios.delete("http://localhost:5000/contact/" + id);
      if (res.status === 200) {
        setMessages(messages.filter((message) => message.id !== id));
      }
    } catch (error) {
      console.log("Error deleting the message:", error);
    }
  }

  return (
    <button
      className="text-red-500 border border-gray-300 py-2 px-6 my-1"
      onClick={(e) => handleDelete(e, message_id)}
    >
      Delete
    </button>
  );
}
