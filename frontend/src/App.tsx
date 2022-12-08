import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { Routes, Route, useLocation, useParams } from 'react-router-dom'
import { Homepage, Navbar, GuildPage, SidebarPage, PremiumPage, DashboardPage, SettingsPage } from './components'
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
      <Route path='/dashboard/:id' element={<SidebarPage/>}>
      <Route path='/dashboard/:id/premium' element={<PremiumPage/>} />
      <Route path='/dashboard/:id/settings' element={<SettingsPage/>} />
      </Route>
     </Routes>
    </div>
  )
}

export default App
