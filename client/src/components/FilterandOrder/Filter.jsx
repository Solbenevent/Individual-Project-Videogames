import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderDesc, orderAsc, filterByGenre, getGenres, orderByCreator } from "../../actions";

const Filter = () => {
    const disptach = useDispatch();
    const genres = useSelector(state => state.genres);

     useEffect(() => {
       disptach(getGenres())
     }, []);

    const handleOrder = (e) => {
        if(e.target.value === "desc_name" ||
        e.target.value === "desc_rating")
         {
           disptach(orderDesc(e.target.value));
          } else if(
          e.target.value === "asc_name" ||
          e.target.value === "asc_rating") {
            disptach(orderAsc(e.target.value));
          } 
    }

    const handleFilter = (e) => {      
      disptach(getGenres(e.target.value));
    };

    const handleCreator = (e) => {
      if(e.target.value === "API" || e.target.value === "Created"){
        disptach(orderByCreator(e.target.value));
      } else {
        disptach(filterByGenre(e.target.value));
      }
    }
    return (
        <div>
         	<div>Filter by Genre</div>
				<select onChange={(e) => handleFilter(e)}>
					<option defaultValue>All</option>
					{genres.map((genre) => (
						<option value={genre} key={genre.id}>{genre}</option>
					))}
				</select>

          <label>Filter by Origin:</label>
          <select onChange={(e)=>handleCreator(e)}>
            <option default>All</option>
            <option value="API">API</option>
            <option value="Created">User videogames</option>
          </select>

          <label>Sort Order:</label>
          <select onChange={(e) => handleOrder(e)}>
            <option value="All" default>All</option>
            <option value ="desc_name">Descending</option>
            <option value="asc_name">Ascending</option>
            <option value="desc_rating">Rating(Lower-Higher)</option>
            <option value="asc_rating">Rating(Higher-Lower)</option>
          </select>
        </div>
    )

}

export default Filter;