import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from './components/Landing/landing';
import Home from "./components/Home/home";
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';

function App() {

  return (
    <div className="App">
      <Routes>
       <Route path = "/" element = {<Landing />} /> 
       <Route path = "/home" element ={ <Home />} />
       <Route path ="/detail/:idVideogame" element = {<Detail />}/>
       <Route path = "/create" element = { <Form />} />
      </Routes>
    </div>
  );
}

export default App;
