import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchGameByName, getVideogames } from "../../actions";
import "../SearchBar/SearchBar.css";

const SearchBar = ({ setCurrentPage }) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = () => {
    if (input) {
      dispatch(searchGameByName(input));
      setCurrentPage(1);
    }
    dispatch(getVideogames());
  };

  const handlerInput = (e) => {
    const { value } = e.target;
    if (!value) {
      dispatch(getVideogames());
      setInput("");
    }
    setInput(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") searchHandler(e);
  };

  const handleCreateClick = () => {
    navigate("/create");
  };

  return (
    <div className="search-container">
      <div className="input-container">
        <input
          type="text"
          name="search"
          value={input}
          onChange={handlerInput}
          onKeyDown={handleKeyPress}
          autoComplete="on"
        />
        <button onClick={() => searchHandler()} className="search-btn">
          Add
        </button>
      </div>
      <div className="create-btn">
        <button className="btn-create" onClick={handleCreateClick}>
          Create
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
