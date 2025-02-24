"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { FaHome, FaEnvelope, FaListAlt, FaSignOutAlt, FaBoxes } from 'react-icons/fa';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const pathname = usePathname()
  const excludeThemePages = ['/admin/auth/login', '/admin/auth/signup'];
  const isExcludedPage = excludeThemePages.includes(pathname);

  return (
    <div className="flex h-screen">
      <QueryClientProvider client={queryClient}>
        {
          !isExcludedPage ? (
            <>
              <aside
                className={`fixed lg:relative h-full bg-gray-900 text-white p-5 space-y-4 w-64 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 flex flex-col`}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold cursor-pointer" onClick={() => router.push("/admin")}>Admin Panel</h2>
                  <button className="lg:hidden text-white" onClick={() => setIsOpen(false)}>
                    <X size={24} />
                  </button>
                </div>
                <nav className="space-y-2 flex flex-col justify-between flex-grow">
                  <div>
                    <Link href="/admin" className="flex items-center justify-between hover:bg-gray-700 p-2 rounded">
                      <span>Home</span>
                      <span>{<FaHome />}</span>
                    </Link>
                    <Link href="/admin/messages" className="flex items-center justify-between hover:bg-gray-700 p-2 rounded">
                      <span>Messages</span>
                      <span>{<FaEnvelope />}</span>
                    </Link>
                    <Link href="/admin/subscriptions" className="flex items-center justify-between hover:bg-gray-700 p-2 rounded">
                      <span>Subscriptions</span>
                      <span>{<FaListAlt />}</span>
                    </Link>
                    <Link href="/admin/products" className="flex items-center justify-between hover:bg-gray-700 p-2 rounded">
                      <span>Products</span>
                      <span>{<FaBoxes />}</span>
                    </Link>
                  </div>
                  <div>
                    <button className="flex items-center justify-between hover:bg-red-700 p-2 rounded w-full" onClick={(e) => {
                      e.preventDefault()
                      const confirm = window.confirm("Are you sure you want to logout?")
                      if (confirm) {
                        localStorage.removeItem('access')
                        localStorage.removeItem('refresh')
                        router.push('/admin/auth/login')
                      }
                    }}>
                      <span>Logout</span>
                      <span>{<FaSignOutAlt />}</span>
                    </button>
                  </div>
                </nav>
              </aside>

              <div className="flex-1 p-1 bg-gray-100">
                <button className="lg:hidden bg-gray-900 text-white p-2 rounded mb-4" onClick={() => setIsOpen(true)}>
                  <Menu size={24} />
                </button>
                {children}
              </div>
            </>
          ) : (
            <div className="flex-1 p-1 bg-gray-100">
              {children}
            </div>
          )
        }
      </QueryClientProvider>
    </div>
  );
}
