import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import FormValidation from './formvalidation'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormValidation />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
