import { useState } from 'react'
import { HashRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from './components/navBar';
import Home from './pages/home'; // Import Home component
import Map from './pages/map'; // Import Map component
import Tourism from './pages/tourism'; // Import Tourism component
import Weather from './pages/weather'; // Import Weather component
import './App.css'

function App() {

  return (
    <Router>
      <div>
        <NavBar />

        {/* Your existing content */}
        <div>
          
        </div>

        {/* routes */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/tourism" element={<Tourism />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;