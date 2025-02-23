import Footer from "../components/footer";
import Header from "../components/header";
import About from "../components/about";

export default function page() {
  return (
    <>
      <div className="mx-auto sm:w-full lg:w-[1280px] h-screen">
        <Header />
        <About />
        <Footer />
      </div>
    </>
  );
};

