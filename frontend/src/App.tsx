import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { Routes, Route } from 'react-router-dom'
import { Homepage, Navbar } from './components'
import AOS from 'aos';
import 'aos/dist/aos.css';
function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    AOS.init()
  },[])
  return (
    <div>
      <Navbar />
     <Routes>
      <Route path='/' element={<Homepage/>}/>
     </Routes>
    </div>
  )
}

export default App
