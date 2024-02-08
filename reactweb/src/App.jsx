import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/map" component={Map} />
          <Route path="/tourism" component={Tourism} />
          <Route path="/weather" component={Weather} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;