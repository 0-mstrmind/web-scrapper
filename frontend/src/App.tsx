import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import "./App.css";
import BlogDetails from "./pages/BlogDetails";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div data-theme="light">
      <div className="container mx-auto min-h-screen">
        <Navbar />
        <div className="min-h-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:blogId" element={<BlogDetails />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
