import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderDesc, orderAsc, filterByGenre, getGenres, orderByCreator, getVideogames } from "../../actions";
import "../FilterandOrder/Filter.css";

const Filter = () => {
    const dispatch = useDispatch();
    const filterBy = useSelector(state=> state.filterBy);
    const genres = useSelector(state => state.genres);

    const [selectedGenre, setSelectedGenre] = useState("All");

    const [origin, setOrigin] = useState("All");

     useEffect(() => {
       dispatch(getGenres())
     }, []);

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

    const handleFilter = (e) => {      
      // dispatch(getGenres(e.target.value));
      const genre = e.target.value;
  
     setSelectedGenre(genre);
     dispatch(filterByGenre(genre));
    };

     const handleCreator = (e) => {
       const selectedOrigin = e.target.value;
       setOrigin(e.target.value);
       dispatch(orderByCreator(selectedOrigin));
     }

    return (
        <div className="filter-container">
         <div className="filter-genre">
         	<label>Filter by Genre</label>
				 <select onChange={(e) => handleFilter(e)} value={selectedGenre}>
					<option defaultValue>All</option>
					{genres.map((genre) => (
						<option value={genre} key={genre.id}>{genre}</option>
					))}
				</select> 
      
        </div>
        <div className="filter-origin">
          <label>Filter by Origin:</label>
          <select onChange={(e)=>handleCreator(e)} value ={origin}>
            <option default>All</option>
            <option value="api">API</option>
            <option value="Created">Created</option>
          </select>
        </div>
        <div className="sort-order">
          <label>Sort Order:</label>
          <select onChange={(e) => handleOrder(e)}>
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