import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ViewPage from './pages/ViewPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/viewgrade" element={<ViewPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App