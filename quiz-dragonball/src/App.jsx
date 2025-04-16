import React from 'react';
import Quiz from './Component/Quiz/Quiz.jsx'
import Home from './Component/Quiz/Home.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>

  )
}
export default App;

