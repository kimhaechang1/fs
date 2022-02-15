import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
}from "react-router-dom"

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/Login" element={<LoginPage/>}/>
          <Route path="/Register" element={<RegisterPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
