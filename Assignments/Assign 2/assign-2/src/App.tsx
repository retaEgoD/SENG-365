import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginPage from './components/LoginPage'
import { AuthContext } from './components/AuthContext';
import './App.css'

function App() {

  const [auth, setAuth] = useState(null);
  const value = {auth, setAuth}

  return (
    <>
      <ChakraProvider>
        <AuthContext.Provider x={value}>
          <div>
          <Router>
            <div>
              <Routes>
                <Route path="/login" element={<LoginPage />}/>
                {/* <Route path="*" element={<NotFound/>}/> */}
              </Routes>
            </div>
          </Router>
          </div>
          </AuthContext.Provider>
      </ChakraProvider>
    </>
  )
}

export default App
