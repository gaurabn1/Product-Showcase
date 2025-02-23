import { create } from "zustand";


interface AboutSection {
  title: string;
  details: string;
}

interface AboutStore {
  aboutSections: AboutSection[],
  setAboutSections: (aboutSections: AboutSection[]) => void
}

const data: AboutSection[] = [
  {
    title: 'Welcome to Trendify - A Curated Product Showcase',
    details: 'At Trendify, we believe that great design and innovation can change the way we experience the world. That’s why we’ve created a platform to showcase a curated collection of products that highlight the best in creativity, craftsmanship, and usability.'
  },
  {
    title: 'Our Purpose',
    details: 'We’re here to inspire you by bringing together an exclusive selection of products that push the boundaries of design and functionality. Whether you’re seeking new ideas, looking for the latest trends, or simply exploring, Trendify offers a space where you can discover products that make life more creative and meaningful.'
  },
  {
    title: 'What We Showcase',
    details: 'From tech gadgets and home decor to lifestyle accessories, we showcase products that stand out for their exceptional design, quality, and innovation. Every product featured on our site is carefully selected to provide you with the best in terms of both form and function.'
  },
  {
    title: 'Why Visit Us?',
    details: 'Looking for inspiration? Our platform lets you discover unique and innovative products that can spark your creativity. Whether you’re a design enthusiast, a gadget lover, or someone who appreciates artistry in everyday items, there’s something here for everyone.'
  },
  {
    title: 'Our Vision',
    details: 'At Trendify, we are passionate about showcasing products that offer both beauty and utility. We believe in the power of design to enhance the everyday, and our platform is dedicated to bringing you products that do just that. We aim to create a space that celebrates both innovation and functionality, making it easier for you to explore, discover, and be inspired.'
  },
]

export const useAboutStore = create<AboutStore>((set) => ({
  aboutSections: data,
  setAboutSections: (aboutSections) => set({ aboutSections })
}))
