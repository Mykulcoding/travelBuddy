import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/home"; // Import Home component
import Map from "./pages/Maps/map"; // Import Map component
import Tourism from "./pages/Tourism/tourism"; // Import Tourism component
import Weather from "./pages/Weather/weather"; // Import Weather component
import Footer from "./components/Footer/footer";
import "./App";
import HeroSection from './components/HeroSection/HeroSection';
import Translator from "./pages/translate/translate";


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
            <Route path="/translate" element={<Translator />} />
            <Route path="/weather" element={<Weather />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}


export default App;
