import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import "../styles/Home.css"; // Make sure to create and import this CSS file

export default function Home() {
  return (
    <div className="home-wrapper">
      <Navbar />
      <Hero /> 

      <main className="home-main">
        <h2>Welcome to Our Library</h2>
        <p>Explore thousands of books and manage your account.</p>
      </main>

      <Footer />
    </div>
  );
}
