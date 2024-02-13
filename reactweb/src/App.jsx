import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/home"; // Import Home component
import Map from "./pages/map"; // Import Map component
import Tourism from "./pages/tourism"; // Import Tourism component
import Weather from "./pages/weather"; // Import Weather component
import Footer from "./components/footer";
import "./App.css";
import HeroSection from './components/HeroSection/HeroSection';



function App() {
  return (
    <Router>
      <div>
        <Header />

    {/* Your existing content */}
        <div>
          {/* routes */}
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/tourism" element={<Tourism />} />
            <Route path="/weather" element={<Weather />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}


export default App;
