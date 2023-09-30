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
      <div>
        <SearchBar setCurrentPage={setCurrentPage} />

        <div>
          <label>Filter by </label>
          <select
            name="Origin"
            onChange={filterHandler}
            defaultValue="Filter By Origin"
            className="select-origin"
          >
            <option value="ALL">All</option>
            <option value="API">Api</option>
            <option value="DATABASE">DataBase</option>
          </select>
        </div>

        <div>
          <select
            name="Genres"
            onChange={filterHandler}
            defaultValue="Filter By Diets"
            className="select-diets"
          >
            <label>Filter By</label>
            <option value="ALL">All</option>
            {genres?.map((genre, index) => {
              return (
                <option value={genre} key={index}>
                  {genre}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label>Order by </label>
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

        <div>
          <label>Order by </label>
          <select
            name="Rating"
            onChange={orderHandler}
            defaultValue="HealthScore Order"
            className="select-score"
          >
            <option value="ALL">All</option>
            <option value="Descendente">Lowest Score</option>
            <option value="Ascendente">Highest Score</option>
          </select>
        </div>

        <div>
          <button onClick={resetAll}>Reset</button>
        </div>

        <div className="container-name">
          <h1 className="title">ALL VIDEOGAMES HERE!</h1>
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
    </div>
  );
};

export default Home;
