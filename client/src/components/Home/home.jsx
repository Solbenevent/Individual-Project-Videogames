import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../actions";
import Cards from "../Cards/Cards";
import Filter from "../FilterandOrder/Filter";
import Pagination from "../Pagination/Pagination";
import { all } from "axios";

const Home = () => {
   const dispatch = useDispatch();
   const videogames = useSelector(state => state.videogames);
   const filteredVideogames = useSelector(state => state.filteredVideogames)
   const orderBy = useSelector(state =>state.orderBy);
 
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 15;


   useEffect(() => {
      dispatch(getVideogames());
   }, []);
   
   let allVideogames;
   orderBy === "Select" ?
   (allVideogames = videogames) :
   (allVideogames = filteredVideogames);

   const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
   }
   
   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;

   const gamesToShow = allVideogames.slice(startIndex, endIndex);

   return (
      <div className="container">
      <div>
         <h1 className="title">All Videogames are here!</h1>
         <Filter  />
         <Cards videogames={gamesToShow} />
         <footer>
            <Pagination totalItems={allVideogames.length}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}/>
         </footer>
      </div>
      </div>
         
   )
};

export default Home;