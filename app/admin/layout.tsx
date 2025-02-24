"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="flex h-screen">
      <aside
        className={`fixed lg:relative h-full bg-gray-900 text-white p-5 space-y-4 w-64 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold cursor-pointer" onClick={() => router.push("/admin")}>Admin Panel</h2>
          <button className="lg:hidden text-white" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="space-y-2">
          <Link href="/admin" className="block hover:bg-gray-700 p-2 rounded">
            Home
          </Link>
          <Link href="/admin/messages" className="block hover:bg-gray-700 p-2 rounded">
            Messages
          </Link>
          <Link href="/admin/subscriptions" className="block hover:bg-gray-700 p-2 rounded">
            Subscriptions
          </Link>
        </nav>
      </aside>

      <div className="flex-1 p-1 bg-gray-100">
        <button className="lg:hidden bg-gray-900 text-white p-2 rounded mb-4" onClick={() => setIsOpen(true)}>
          <Menu size={24} />
        </button>
        {children}
      </div>
    </div>
  );
}
