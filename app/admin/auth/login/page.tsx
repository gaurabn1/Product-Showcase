'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import { FormData } from './types/login-data';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://localhost:8000/api/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (res.status == 200) {
      const data = await res.json();
      console.log(data)
      const access = data.token.access;
      const refresh = data.token.refresh;
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
      setFormData({ username: '', password: '' })
      toast.success("Login successful")
      router.push('/admin')
    } else {
      toast.error("Invalid credentials. Please try again.");
    }

  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="login-container flex flex-col justify-center h-screen">
      <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 border rounded">
        <div className="flex justify-center">
          <Image src="/images/admin.png" className="lg:w-max lg:h-max" alt="Logo" width={100} height={100} />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="username"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
}
