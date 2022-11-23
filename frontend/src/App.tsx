import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Routes, Route } from 'react-router-dom'
import { Homepage, Navbar } from './components'
function App() {
  const [count, setCount] = useState(0)

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
