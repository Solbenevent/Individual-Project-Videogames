import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../Cards/Cards";
import {
  orderAlphabetic,
  filterByGenre,
  orderByCreator,
  orderByRating,
  getGenres,
  getVideogames,
  deleteFilters,
} from "../../actions";
//import Filter from "../FilterandOrder/Filter";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/searchBar";
import "../Home/Home.css";

const Home = () => {
  const dispatch = useDispatch();

  const videogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);
  const filteredVideogames = useSelector((state) => state.filteredVideogames);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastGame = currentPage * itemsPerPage;
  const indexOfFirstGame = indexOfLastGame - itemsPerPage;
  const currentVideogame =
    videogames?.length > 0 &&
    videogames.slice(indexOfFirstGame, indexOfLastGame);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const filterHandler = (e) => {
    const { name, value } = e.target;
    if (name === "Genres" || name === "Origin") {
      dispatch(filterByGenre(value)); // Actualiza el filtro por género
      setCurrentPage(1);
    } else {
      dispatch(orderByCreator(value)); // Actualiza el filtro por creador
      setCurrentPage(1);
    }
    if (value === "ALL") {
      dispatch(getVideogames());
    }
  };

  const orderHandler = (e) => {
    const { name, value } = e.target;
    if (name === "Alphabetic") {
      dispatch(orderAlphabetic(value));
    } else if (name === "Rating") {
      dispatch(orderByRating(value));
    }
    dispatch(getVideogames());
  };

  const resetAll = () => {
    dispatch(deleteFilters());
    const selectElements = document.getElementsByTagName("select");
    for (let i = 0; i < selectElements.length; i++) {
      selectElements[i].selectedIndex = 0;
    }
    dispatch(getVideogames());
  };

  return (
    <div className="container-home">
      <div className="container-searchbar">
        {/* <SearchBar setCurrentPage={setCurrentPage} /> */}

        <div className="container-filter-row">
          <div className="contianer-filter">
            <label className="label-origin">Filter by </label>
            <select
              name="Origin"
              onChange={filterHandler}
              defaultValue="Filter By Origin"
              className="select-origin"
            >
              <option value="ALL" className="options">
                All
              </option>
              <option value="API" className="options">
                Api
              </option>
              <option value="DATABASE" className="options">
                DataBase
              </option>
            </select>
          </div>

          <div className="container-filter">
            <label className="label-genres">Filter By</label>
            <select
              name="Genres"
              onChange={filterHandler}
              defaultValue="Filter By Diets"
              className="select-diets"
            >
              <option value="ALL">All</option>
              {genres?.map((genre, index) => {
                return (
                  <option value={genre} key={index} className="options">
                    {genre}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="container-filter">
            <label className="label-alfabetic">Order by </label>
            <select
              name="Alphabetic"
              onChange={orderHandler}
              defaultValue="Alphabetic Order"
              className="select-order"
            >
              <option value="ALL">All</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>
          </div>

          <div className="contianer-filter">
            <label className="label-rating">Order by </label>
            <select
              name="Rating"
              onChange={orderHandler}
              defaultValue="Rating Order"
              className="select-rating"
            >
              <option value="ALL">All</option>
              <option value="Descendente">Lowest Rating</option>
              <option value="Ascendente">Highest Rating</option>
            </select>
          </div>

          <div className="container-reset">
            <button onClick={resetAll} className="btn-reset">
              Reset
            </button>
          </div>
        </div>

        <div className="container-titulo">
          {/* <h1 className="title">¡ALL VIDEOGAMES HERE!</h1> */}
        </div>

        <div>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={videogames.length}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
        <Cards
          videogames={
            filteredVideogames.length > 0
              ? filteredVideogames
              : currentVideogame
          }
        />
      </div>

      <footer className="footer-home">
        <div class="contenedor-principal-footer">
          <div class="contenedor-copyright">
            <p>Copyright © 2023</p>
          </div>
          <div class="contenedor-links"></div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
