import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import LoginPage from './components/LoginPage'
import FilmsPage from './components/FilmsPage'
import SingleFilm from './components/SingleFilm';

function App() {

  return (
    <>
      <ChakraProvider >
        <div>
        <Router>
          <div>
            <Routes>
              <Route path="/login" element={<LoginPage />}/>
              <Route path="/films" element={<FilmsPage />}/>
              <Route path="/films/:id" element={<SingleFilm />}/>
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
