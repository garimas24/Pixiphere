import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"
import Footer from "./components/Footer";
import CategoryListing from "./pages/CategoryListing"
import PhotographerProfile from "./pages/PhotographerProfile";
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
