import React from 'react';
import { Product } from '@/app/products/types/product';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Image from 'next/image';

interface ProductTableProps {
  products: Product[];
}

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="lg:container mx-auto mt-8 hidden md:table">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-300 text-left">
            <th className="text-center">ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Price</th>
            <th>Category</th>
            <th className="text-center">Rating</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border border-gray-300 even:bg-gray-200">
              <td className="text-center">{product.id}</td>
              <td>{product.title}</td>
              <td className="text-left">
                <Popover>
                  <PopoverTrigger>
                    <p className="cursor-pointer text-blue-500 border border-gray-300 py-2 px-6 my-1">View</p>
                  </PopoverTrigger>
                  <PopoverContent>
                    <p>{product.description}</p>
                  </PopoverContent>
                </Popover>
              </td>
              <td className=" text-left">
                <Popover>
                  <PopoverTrigger>
                    <p className="cursor-pointer text-blue-500 border border-gray-300 py-2 px-6 my-1">View</p>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Image src={product.image} alt={product.title} width={400} height={400} />
                  </PopoverContent>
                </Popover>
              </td>
              <td className="text-left">${product.price}</td>
              <td className="text-left capitalize">{product.category}</td>
              <td className="text-center">{product.rating.rate} / 5</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  );
}
