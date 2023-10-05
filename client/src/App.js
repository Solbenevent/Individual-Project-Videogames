import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getVideogames } from './actions';
import Landing from './components/Landing/landing';
import Home from "./components/Home/home";
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import SearchBar from './components/SearchBar/searchBar';
import About from "./components/About/About";

function App() {

  const { pathname } = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideogames()); 
  }, [dispatch])

  return (
    <div className="App">
      {pathname !== "/" && <SearchBar /> }    
      <Routes>
       <Route path = "/" element = {<Landing />} /> 
       <Route path = "/home" element ={ <Home />} />
       <Route path ="/detail/:idVideogame" element = {<Detail />}/>
       <Route path = "/create" element = { <Form />} />
       <Route path="/about" element = {<About />}/>
      </Routes>
    </div>
  );
}

export default App;
