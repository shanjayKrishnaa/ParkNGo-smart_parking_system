import './App.css'
import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/SignUp'
import Home from './pages/Home'
import Slot from './pages/Slot'
import Booking from './pages/Booking'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/slot" element={<Slot />} />
      <Route path="/booking" element={<Booking />} />
    </Routes>
    </>
  )
}

export default App
