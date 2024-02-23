import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Books";
import Add from "./pages/Add"
import Admlogin from './pages/Admlogin';
import Adisp from './pages/Adisp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/adm" element={<Adisp/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path="/login" element={<Admlogin/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
