import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { Routes, Route, useLocation, useParams } from 'react-router-dom'
import { Homepage, Navbar, GuildPage, Dashboard } from './components'
import AOS from 'aos';
import 'aos/dist/aos.css';
function App() {
  const location = useLocation()
  const [count, setCount] = useState(0)
  useEffect(() => {
    AOS.init()
  },[])

  const params = useParams()
  return (
    <div>
     <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/dashboard' element={<GuildPage/>} />
      <Route path='/dashboard/:id' element={<Dashboard/>} />
     </Routes>
    </div>
  )
}

export default App
