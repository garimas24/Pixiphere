import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"
import Footer from "./components/Footer";
import CategoryListing from "./pages/CategoryListing"
import PhotographerProfile from "./pages/PhotographerProfile";
import About from "./About/About";
import Contact from "./Contact/Contact";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<CategoryListing />} />
            <Route path="/photographer/:id" element={<PhotographerProfile />} />
              <Route path="/about" element={<About />} />
               <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
