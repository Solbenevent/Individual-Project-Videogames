import { useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = ({ onSearch }) => {
    const [name, setName] = useState("");

    const handleChange = (e) => {
        setName(e.target.value);
    }
   

    return (
       <div>
        <div>
            <input type="search"
            onChange={handleChange}/>
            <button onClick={() => onSearch(name)}>Add</button>
        </div>

        <div>
          <Link to="/create" >
            <p>Create</p>
          </Link>
        </div>
       </div>
    )
}

export default SearchBar;