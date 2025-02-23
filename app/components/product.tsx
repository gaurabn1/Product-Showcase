import Image from "next/image";
import { useProducts } from "../hooks/fetch-products";
import { usePathname } from "next/navigation";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import Button from "./ui/Button";
import Link from "next/link";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function Product() {
  const { data: products, isLoading, isError } = useProducts();
  const pathname = usePathname()
  const productId = pathname.split('/')[2]
  const currentProduct = products?.find((p) => p.id === parseInt(productId));

  if (isLoading) {
    return (
      <LoadingAnimation />
    )
  }

  if (isError) {
    return (
      <p>Something went wrong</p>
    )
  }

  const product = products?.find((p) => p.id === parseInt(productId));

  return (
    <>
      <div className="md:h-[calc(100vh-139px)] flex flex-col gap-y-10 justify-around">
        <section className="flex flex-col-reverse gap-y-10 sm:flex-row items-center justify-around">
          <div className="sm:w-1/2 px-5 flex flex-col gap-y-5">
            <h2 className="text-4xl leading-[1.2]">{product?.title}</h2>
            <p className="text-lg">{product?.description}</p>
            <div className="flex items-center justify-end gap-x-5">
              <div className="w-16 bg-gray-300 h-1"></div>
              <p className="text-xl">${product?.price}</p>
            </div>
            <div className="flex justify-end">
              {[...Array(5)].map((_, index) => {
                const fullStarIndex = index < Math.floor(currentProduct?.rating?.rate || 0);
                const halfStarIndex =
                  index === Math.floor(currentProduct?.rating?.rate || 0) && (currentProduct?.rating?.rate ?? 0) % 1 !== 0;

                return halfStarIndex ? (
                  <FaStarHalfAlt key={index} className="text-yellow-500" />
                ) : fullStarIndex ? (
                  <FaStar key={index} className="text-yellow-500" />
                ) : (
                  <FaStar key={index} className="text-gray-400" />
                );
              })}
            </div>
            <div className="flex items-center justify-end">
              <Button variant="transparent" noHover><span className="capitalize">{product?.category}</span></Button>
            </div>
          </div>
          <div>
            {product ? (
              <div className="mt-4">
                <section>
                  <Image
                    src={product?.image}
                    alt="Product Image"
                    width={300}
                    height={300}
                    className="w-full h-full mix-blend-multiply transition-transform ease-in-out duration-500 hover:scale-105 dark:brightness-150"
                  />
                </section>
              </div>
            ) : (
              <p>Product not found</p>
            )}
          </div>
        </section>
        <section className="mb-5">
          <div className="text-center">
            <h3 className="text-xl mb-4">For similar products, kindly visit the</h3>
            <Link href="/products">
              <Button variant="transparent" className=" text-blue-500">
                Products Page
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
};

