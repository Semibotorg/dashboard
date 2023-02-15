import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { Routes, Route, useLocation, useParams } from 'react-router-dom'
import { Homepage, Navbar, GuildPage, SidebarPage, PremiumPage, DashboardPage, SettingsPage, TwitchPage } from './components'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Footer } from './components/Home/Footer';
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
      <Route path='/dashboard/:id/twitch' element={<TwitchPage/>} />
      <Route path='/dashboard/:id/twitter' element={<SettingsPage/>} />
      <Route path='/dashboard/:id/reddit' element={<SettingsPage/>} />
      <Route path='/dashboard/:id/youtube' element={<SettingsPage/>} />
      </Route>
     </Routes>
     
    </div>
  )
}

export default App
