import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import NailsGallery from "@/components/NailsGallery";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <NailsGallery />
      <Skills />
      <Testimonials />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}