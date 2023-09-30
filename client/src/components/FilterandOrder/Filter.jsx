import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderDesc, orderAsc, getGenres, filterByGenreAndOrigin, filterByGenre, orderByCreator } from "../../actions";
import "../FilterandOrder/Filter.css";

const Filter = () => {
    const dispatch = useDispatch();
    const orderBy = useSelector(state=> state.filterBy);
    const genres = useSelector(state => state.genres);
    const filterBy = useSelector(state => state.filterBy);

    const [selectedGenre, setSelectedGenre] = useState("All");
    const [origin, setOrigin] = useState("All");
 
     useEffect(() => {
       dispatch(getGenres())
     }, [dispatch]);

     const handleFilterByGenre = (genre) => {
       setSelectedGenre(genre);
       dispatch(filterByGenre(genre));
     }

    const handleOrderByCreator = (origin) => {
      setOrigin(origin);
      dispatch(orderByCreator(origin));
    }



    const handleOrder = (e) => {
        if(e.target.value === "desc_name" ||
        e.target.value === "desc_rating")
         {
           dispatch(orderDesc(e.target.value));
          } else if(
          e.target.value === "asc_name" ||
          e.target.value === "asc_rating") {
            dispatch(orderAsc(e.target.value));
          } 
       
    }
   
      
    

    return (
        <div className="filter-container">
         <div className="filter-genre">
         	<label>Filter by Genre</label>
				 <select onChange={(e) => handleFilterByGenre(e.target.value)} value ={selectedGenre}>
					<option defaultValue>All</option>
					{genres.map((genre) => (
						<option value={genre} key={genre.id}>{genre}</option>
					))}
				</select> 
      
        </div>
        <div className="filter-origin">
          <label>Filter by Origin:</label>
          <select onChange={(e) => handleOrderByCreator(e.target.value)} value={origin}>
            <option default>All</option>
            <option value="API">API</option>
            <option value="Created">Created</option>
          </select>
        </div>
        <div className="sort-order">
          <label>Sort Order:</label>
          <select onChange={handleOrder}>
            <option value="All" default>All</option>
            <option value ="desc_name">Descending</option>
            <option value="asc_name">Ascending</option>
            <option value="desc_rating">Rating(Lower-Higher)</option>
            <option value="asc_rating">Rating(Higher-Lower)</option>
          </select>
          </div>  
        </div>
    )

}

export default Filter;