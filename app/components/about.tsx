"use client"
import Image from "next/image";
import { useAboutStore } from "../store/UseAboutStore";


export default function About() {
  const aboutSections = useAboutStore(state => state.aboutSections)
  return (
    <>
      <main className="px-10 mt-2">
        <div className=" flex gap-5 flex-col sm:px-5 md:px-10">
          <article className="flex gap-12 md:px-10 sm:py-5  items-center border-b-2 border-gray-300">
            <div className="flex flex-col lg:w-1/2 pb-5">
              <h1>About Us</h1>
              <h2 className="text-3xl mt-2 font-bold">{aboutSections[0].title}</h2>
              <p className="mt-8 text-lg">{aboutSections[0].details}</p>
            </div>
            <Image priority src="/images/about.png" className="rotate-[55deg] hidden md:hidden lg:block" width={500} height={500} alt="About Image" />
          </article>
        </div>
        <div className="mb-5 flex gap-5 flex-col sm:px-5 md:px-10">
          <article className="grid lg:mx-auto sm:grid-cols-1 sm:px-5 md:grid-cols-2 gap-8 mt-8">
            {
              aboutSections.slice(1, aboutSections.length).map((section, index) => (
                <div key={index} className="flex flex-col">
                  <h1 className="text-3xl font-bold">{section.title}</h1>
                  <p className="mt-8 text-lg">{section.details}</p>
                </div>
              ))
            }
          </article>
        </div>
      </main>
    </>
  );
};

