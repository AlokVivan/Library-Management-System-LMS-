import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomePage from "../components/HomePage";


 // Make sure to create and import this CSS file


 export default function Home() {
  return (
    <div className="home-wrapper">
      <Navbar />
      <HomePage /> 
      
      <Footer />
    </div>
  );
}


