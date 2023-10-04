import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchGameByName, getVideogames } from "../../actions";
import logo from "../imagenes/skulls.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../SearchBar/SearchBar.css";

const SearchBar = ({ setCurrentPage }) => {
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const errorMessage = useSelector((state) => state.errorMessage);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

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
      <div className="logo">
        <img src={logo} alt="logo" className="logo-search" />
      </div>
      <div className="input-container">
        <div
          className={`search-icon ${isSearchVisible ? "hidden" : ""}`}
          onClick={() => setIsSearchVisible(true)}
        >
          <FontAwesomeIcon
            icon={faSearch}
            size="2xl"
            style={{ color: "#4c007d" }}
          />
        </div>
        {isSearchVisible && (
          <>
            <input
              type="text"
              name="search"
              value={input}
              onChange={handlerInput}
              onKeyDown={handleKeyPress}
              autoComplete="on"
              className="input-search"
            />
            <button onClick={() => searchHandler()} className="search-btn">
              Search
            </button>
          </>
        )}
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
