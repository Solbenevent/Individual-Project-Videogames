import { GET_GAMES, GET_DETAIL, GET_GENRES, ORDER_ASC_RATING, ORDER_DESC_RATING, ORDER_BY_CREATOR, FILTER_BY_GENRE, CREATE_VIDEOGAME, ORDER_BY_API, SEARCH_GAME_BY_NAME} from "../actions/actionTypes";

const initialState ={
   videogames: [],
   searchVideogame: [],
   createVideogame: null,
   searchVideogameByName: [],
   videogameDetail: [],
   genres: [],
   orderBy: "Select",
   filterBy: "All",
   filteredVideogames: [],
   currentPage: 1,
   itemsPerPage: 15, 
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
    case GET_GAMES:
        return {
            ...state, 
            videogames:action.payload,
            filteredVideogames: action.payload,
    }
    case SEARCH_GAME_BY_NAME:
        return {
            ...state,
            searchVideogameByName: action.payload,
        }
    case GET_DETAIL:
        return {
            ...state,
            videogameDetail: action.payload
        }
    case GET_GENRES:
        return {
            ...state,
            genres: action.payload
        }
    case ORDER_ASC_RATING:
    case ORDER_DESC_RATING:
        return {
            ...state,
            filteredVideogames: action.payload.videogamesOrder,
            orderBy: action.payload.name,
        }
    case ORDER_BY_CREATOR:
        return {
            ...state,
            filteredVideogames: action.payload,
        }
    case ORDER_BY_API:
        console.log(action.payload);
        console.log("api");
        return {
            ...state,
           videogames: action.payload
        }    
    case FILTER_BY_GENRE:

           return {
             ...state,
             videogames: action.payload,
             filteredVideogames: action.payload,

        } 

    case CREATE_VIDEOGAME:
        return {
            ...state,
            createVideogame: action.payload
        }    
        default:
            return {...state}
    };
} 

export default rootReducer;   



