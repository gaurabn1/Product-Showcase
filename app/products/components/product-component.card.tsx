import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import Image from "next/image";
import { Product } from "../types/product";
import { Card, CardBody, CardFooter, CardHeader } from '@/app/components/ui/Card';
import Link from 'next/link';


export const ProductCardComponent = ({ product }: { product: Product }) => {
  return (
    <Card>
      <div className="relative w-full mb-2 h-[400px]">
        <Image
          priority
          src={product.image}
          alt={product.title}
          layout="fill"
          className="w-full h-full mix-blend-multiply transition-transform ease-in-out duration-500 hover:scale-105 brightness-105"
        />
      </div>
      <CardHeader>{product.title}</CardHeader>
      <CardBody>
        <div className="flex justify-between">
          <div className="flex">
            {[...Array(5)].map((_, index) => {
              const fullStarIndex = index < Math.floor(product.rating?.rate || 0);
              const halfStarIndex =
                index === Math.floor(product.rating?.rate || 0) && (product.rating?.rate ?? 0) % 1 !== 0;

              return halfStarIndex ? (
                <FaStarHalfAlt key={index} className="text-yellow-500" />
              ) : fullStarIndex ? (
                <FaStar key={index} className="text-yellow-500" />
              ) : (
                <FaStar key={index} className="text-gray-400" />
              );
            })}
          </div>
          <p className="text-lg font-bold text-current text-right">${product.price}</p>
        </div>
      </CardBody>
      <CardFooter>
        <div className="flex items-center justify-between">
          <button className="text-sm cursor capitalize border border-gray-400 p-2 w-max hover:bg-secondary hover:text-foreground">
            {product.category}
          </button>
          <Link href={`/products/${product.id}`}>
            <button className="text-sm cursor capitalize border border-gray-400 p-2 w-max hover:bg-secondary hover:text-foreground">
              Details
            </button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
