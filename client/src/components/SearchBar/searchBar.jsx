import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchGameByName } from "../../actions";
import "../SearchBar/SearchBar.css";

const SearchBar = () => {
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    

    const handleChange = (e) => {
      const value = e.target.value;
        setName(value);
    }
   
    const handleSearch = (e) => {
      e.preventDefault();
      if(name !== ""){
        dispatch(searchGameByName(name));
        setName("");
            }
    }

    return (
       <div className="search-container">
        <div className="input-container">
            <input type="search-input"
            onChange={(e) => handleChange(e)}/>
            <button onClick={handleSearch} className="search-btn">Add</button>
        </div>

        <div className="create-btn">
          <Link to="/create" >
            <button className="btn-create">Create</button>
          </Link>
        </div>
       </div>
    )
}

export default SearchBar;