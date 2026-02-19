import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Mainlayout from './Layouts/Mainlayout'

import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Forgetpass from './Pages/Forgetpass'

import Admindashboard from './Pages/Admindashboard'
import Adminprofile from './Pages/Adminprofile'

import Studentdashboard from './Pages/Studentdashboard'
import Studentprofile from './Pages/Studentprofile'

import Management from './Cardpages/Management'
import Pio from './Cardpages/Pio'
import Profileinfo from './Cardpages/Profileinfo'
import Remote from './Cardpages/Remote'
import Mentor from './Cardpages/Mentor'
import Messages from './Cardpages/Messages'
import Progress from './Cardpages/Progress'
import Tasks from './Cardpages/Tasks'

const App = () => {
  return (
    <Routes>
      {/* Layout Route */}
      <Route element={<Mainlayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Forgetpass" element={<Forgetpass />} />

      {/* Admin Routes */}
      <Route path="/admin-dashboard" element={<Admindashboard />} />
      <Route path="/admin-profile" element={<Adminprofile />} />

      {/* Student Routes */}
      <Route path="/student-dashboard" element={<Studentdashboard />} />
      <Route path="/student-profile" element={<Studentprofile />} />

      {/* Card Pages */}
      <Route path="/pio" element={<Pio />} />
      <Route path="/management" element={<Management />} />
      <Route path="/profileinfo" element={<Profileinfo />} />
      <Route path="/remote" element={<Remote />} />
      <Route path="/mentor" element={<Mentor />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  )
}

export default App
