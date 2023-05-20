import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginPage from './components/LoginPage'
import FilmPage from './components/FilmPage'
import './App.css'

function App() {

  return (
    <>
      <ChakraProvider >
        <div>
        <Router>
          <div>
            <Routes>
              <Route path="/login" element={<LoginPage />}/>
              <Route path="/films" element={<FilmPage />}/>
              {/* <Route path="*" element={<NotFound/>}/> */}
            </Routes>
          </div>
        </Router>
        </div>
      </ChakraProvider>
    </>
  )
}

export default App
