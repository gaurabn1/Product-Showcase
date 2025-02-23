"use client";
import React from "react";
import { motion } from "framer-motion";
import Button from "./ui/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Carousel from "./corousel";
import { useProducts } from "../hooks/fetch-products";
import { Product } from "../products/types/product";
import { LoadingAnimation } from "@/components/ui/loading-animation";

const HeroSection = () => {
  const navigate = useRouter();
  const { data: products, isLoading, isError } = useProducts();

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <main className={!isError ? "" : "md:h-[calc(100vh-139px)] flex justify-center items-center"}>
      <section className="flex items-center justify-between flex-row md:px-10">

        <motion.div
          initial={{ x: "-100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.8 }}
          className="flex flex-col justify-center gap-6 md:w-[50%] px-5"
        >
          <h1 className="text-5xl sm:text-6xl leading-[1.2] font-bold uppercase">
            Product Showcase
          </h1>
          <p className="pr-7 leading-[1.8]">
            Explore our curated collection of high-quality products, designed
            to bring style, comfort, and innovation into your everyday life.
            Find the perfect items to suit your needs and elevate your
            experience.
          </p>
          <Button
            variant="primary"
            style={{ width: "max-content" }}
            onClick={() => navigate.push("/products")}
          >
            Visit Now
          </Button>
        </motion.div>

        <motion.div
          initial={{ x: "100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.8 }}
        >
          <Image
            priority
            src="/images/shoe_image.png"
            alt="Landing Image"
            width={500}
            height={500}
            className="w-full rotate-[15deg] hidden md:block transition-transform ease-in-out duration-1000 hover:rotate-[30deg]"
          />
        </motion.div>

      </section>

      {!isError && (
        <section>
          <Carousel>
            {products?.map((product: Product) => (
              <div key={product.id} className="bg-[hsl(220.9 39.3% 11%)] mix-blend-multiply">
                <Image
                  priority
                  src={product.image}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="brightness-105"
                />
              </div>
            ))}
          </Carousel>
        </section>
      )}
    </main>
  );
};

export default HeroSection;
