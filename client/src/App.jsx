import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import FeedPage from './pages/FeedPage'
import UploadForm from './pages/UploadForm'
import './App.css'

function App() {
  return (
    <Router>
      <div>
        <nav className="bg-blue-600 p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-white font-bold text-xl">ParkFails</div>
            <div className="space-x-4">
              <Link to="/" className="text-white hover:text-blue-200">Home</Link>
              <Link to="/feed" className="text-white hover:text-blue-200">Feed</Link>
            </div>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/upload" element={<UploadForm />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
