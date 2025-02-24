import React from 'react';
import { Product } from '@/app/products/types/product';

interface ProductCardProps {
  products: Product[];
}

export default function ProductCard({ products }: ProductCardProps) {
  return (
    <div className="block md:hidden">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      {products.map((product) => (
        <div key={product.id} className="border border-gray-300 p-4 mb-4 rounded-lg shadow-sm">
          <h3 className="font-bold text-lg">{product.title}</h3>
          <p className="text-gray-700">Price: ${product.price}</p>
          <p className="text-gray-700">Category: {product.category}</p>
          <p className="text-gray-700">Rating: {product.rating.rate} / 5</p>
        </div>
      ))}
    </div>
  );
}
