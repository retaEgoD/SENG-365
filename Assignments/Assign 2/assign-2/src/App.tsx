import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginPage from './components/LoginPage'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <>
      <div>
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            {/* <Route path="*" element={<NotFound/>}/> */}
          </Routes>
        </div>
      </Router>
      </div>
    </>
  )
}

export default App
