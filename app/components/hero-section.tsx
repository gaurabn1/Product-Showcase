"use client"
import React from 'react';
import Button from './ui/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const HeroSection = () => {

  const navigate = useRouter();

  return (
    <>
      <main className="flex items-center justify-between flex-row h-[calc(100vh-139px)] md:px-10 gap-6">
        <div className="flex flex-col justify-center gap-6 md:w-[50%] px-5 ">
          <h1 className=" text-5xl sm:text-6xl leading-[1.2] font-bold uppercase">Product Showcase</h1>
          <p className="pr-7 leading-[1.8]">Explore our curated collection of high-quality products, designed to bring style, comfort, and innovation into your everyday life. Find the perfect items to suit your needs and elevate your experience</p>
          <Button variant="primary" style={{ width: 'max-content' }} onClick={() => navigate.push('/products')}>Shop Now</Button>
        </div>
        <div>
          <Image priority src="/images/shoe_image.png" alt="Landing Image" width={500} height={500} className="w-full rotate-[15deg] hidden md:block transition-transform ease-in-out duration-1000 hover:rotate-[30deg]" />
        </div>
      </main>
    </>
  )
};

export default HeroSection;
