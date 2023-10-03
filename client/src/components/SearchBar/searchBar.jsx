import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchGameByName, getVideogames } from "../../actions";
import "../SearchBar/SearchBar.css";

const SearchBar = ({ setCurrentPage }) => {
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const errorMessage = useSelector((state) => state.errorMessage);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = () => {
    if (input) {
      dispatch(searchGameByName(input));
      setCurrentPage(1);
    }
    dispatch(getVideogames());
    if (errorMessage) {
      setShowModal(true);
    }
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

  const closeModal = () => {
    setShowModal(false);
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
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}
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
