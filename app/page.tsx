import Footer from "./components/footer";
import Header from "./components/header";
import HeroSection from "./components/hero-section";

export default function Home() {
  return (
    <>
      <div className="mx-auto lg:w-[1280px] h-screen">
        <Header />
        <HeroSection />
        <Footer />
      </div>
    </>
  );
}
