import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import LoginPage from './modals/LoginModal'
import FilmsPage from './Pages/FilmsPage'
import SingleFilm from './Pages/SingleFilm';
import NotFound from "./Pages/NotFound";

function App() {

  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/films" element={<FilmsPage />}/>
            <Route path="/" element={<FilmsPage />}/>
            <Route path="/films/:id" element={<SingleFilm />}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
