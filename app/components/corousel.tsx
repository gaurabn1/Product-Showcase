import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({ children }: { children: ReactNode }) {
  const slides = Array.isArray(children) ? children.slice(0, 5) : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const router = useRouter();

  const nextSlide = () => {
    setIsPaused(true);
    if (currentIndex >= slides.length - 2) {
      router.push("/products");
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    setIsPaused(true);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  useEffect(() => {
    if (!isPaused) {
      const autoSlideInterval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex === slides.length - 2) {
            setDirection(-1);
            return prevIndex - 1;
          } else if (prevIndex === 0) {
            setDirection(1);
            return prevIndex + 1;
          }
          return prevIndex + direction;
        });
      }, 2000);

      return () => clearInterval(autoSlideInterval);
    }
  }, [isPaused, direction, slides.length]);

  useEffect(() => {
    if (isPaused) {
      const resumeTimeout = setTimeout(() => {
        setIsPaused(false);
      }, 2000);

      return () => clearTimeout(resumeTimeout);
    }
  }, [isPaused]);

  return (
    <div className="overflow-hidden relative w-full max-w-lg mx-auto">
      <div
        className=" flex items-center transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {slide}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prevSlide}
          className="p-1 rounded-full shadow bg-white text-gray-800 hover:bg-gray-100"
        >
          <ChevronLeft size={40} />
        </button>

        <button
          onClick={nextSlide}
          className="p-1 rounded-full shadow bg-white text-gray-800 hover:bg-gray-100"
        >
          <ChevronRight size={40} />
        </button>
      </div>
    </div>
  );
}
