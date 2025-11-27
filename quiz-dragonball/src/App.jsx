import React from 'react';
import Quiz from './Component/Quiz/Quiz.jsx'
import Home from './Component/Quiz/Home.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>

  )
}
export default App;

