import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Overview from './pages/Overview'
import LearnerDirectory from './pages/LearnerDirectory'
import Gradebook from './pages/Gradebook'
import Attendance from './pages/Attendance'
import Performance from './pages/Performance'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="main-area">
          <Header onMenu={() => setSidebarOpen(true)} />
          <div className="page-wrap">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/learners" element={<LearnerDirectory />} />
              <Route path="/gradebook" element={<Gradebook />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/performance" element={<Performance />} />
            </Routes>
          </div>
          <footer className="app-footer"><span>StudyLedger</span><span>Records stay in this browser via localStorage.</span></footer>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
