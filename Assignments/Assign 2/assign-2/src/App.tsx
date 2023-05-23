import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import LoginPage from './components/LoginModal'
import FilmsPage from './Pages/FilmsPage'
import SingleFilm from './Pages/SingleFilm';

function App() {

  return (
    <>
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
    </>
  )
}

export default App
