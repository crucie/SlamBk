import './App.css'
import { useState } from 'react'
// import Home from './pages/Home'
import Slam from './pages/slamPg/Slam'
import Auth from './pages/auth/Auth'

function App() {
  const [currentPage, setCurrentPage] = useState('home') // 'home' or 'slam'

  return (
    <>
      {/* <Slam/> */}
      <Auth/>
    </>
  )
}

export default App
