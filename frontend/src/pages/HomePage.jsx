import React from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage() {
    const navigate = useNavigate();
  return (
    <>
    <div><h1>Welcome Home</h1></div>
    <button onClick={() => {
        navigate('/viewgrade')
    }}>View Grade</button>
    </>
  )
}

export default HomePage