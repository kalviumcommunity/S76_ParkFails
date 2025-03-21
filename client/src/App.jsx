import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import FeedPage from './pages/FeedPage'
import UploadForm from './pages/UploadForm'
import UpdatePage from './pages/UpdatePage';
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
              <Link to="/upload" className="text-white hover:text-blue-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Upload
              </Link>
            </div>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/upload" element={<UploadForm />} />
          <Route path="/update/:id" element={<UpdatePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
