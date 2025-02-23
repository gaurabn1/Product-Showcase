import Contact from "../components/contact"
import Footer from "../components/footer"
import Header from "../components/header"

export default function page() {
  return (
    <>
      <div className="mx-auto sm:w-full lg:w-[1280px] h-screen">
        <Header />
        <Contact />
        <Footer />
      </div>
    </>
  )
};
