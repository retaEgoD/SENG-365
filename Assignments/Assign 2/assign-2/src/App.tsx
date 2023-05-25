import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import FilmsPage from './Pages/FilmsPage'
import SingleFilm from './Pages/SingleFilm';
import NotFound from "./Pages/NotFound";
import MyFilms from "./Pages/MyFilms";

function App() {

  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<FilmsPage />}/>
            <Route path="/films" element={<FilmsPage />}/>
            <Route path="/home" element={<FilmsPage />}/>
            <Route path="/myfilms" element={<MyFilms />}/>
            <Route path="/films/:id" element={<SingleFilm />}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
