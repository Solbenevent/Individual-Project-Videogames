import { GET_GAMES, GET_DETAIL, GET_GENRES, DELETE_FILTERS, ORDER_ASC_RATING, ORDER_DESC_RATING, FILTER_BY_CREATOR, FILTER_BY_GENRE, CREATE_VIDEOGAME, ORDER_BY_API, SEARCH_GAME_BY_NAME, CLEAR_DETAIL, ORDER_RATING, ORDER_ALPHABETIC, SET_ERROR_MESSAGE} from "../actions/actionTypes";
import { mergeSort } from "./mergeAndQuickSort"; 

const initialState ={
   videogames: [],
   videogameDetail: [],
   genres: [],
   filteredVideogames: [],
   errorMessage: ""
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
    case GET_GAMES:
        return {
            ...state, 
            videogames:action.payload,
    }
    case SET_ERROR_MESSAGE: 
    return {
        ...state,
        errorMessage: action.payload
    }

    case SEARCH_GAME_BY_NAME:
        return {
            ...state,
            filteredVideogames: action.payload,   
  
        }
    case GET_DETAIL:
        return {
            ...state,
            videogameDetail: action.payload
        }
    case CLEAR_DETAIL: 
        return {
            ...state,
            videogameDetail: []
        }    
    case GET_GENRES:
        return {
            ...state,
            genres: action.payload
        }

    case ORDER_ALPHABETIC:
        const sortedGames = mergeSort(state.videogames.slice(), action.payload === "A-Z" ? 'asc' : 'desc', 'name'); // Clonamos el arreglo antes de ordenarlo
        return {
          ...state,
          filteredVideogames: sortedGames,
        }
      
      


case FILTER_BY_GENRE:
    const allGamesFiltered = state.videogames.filter(
        (game) => game.genres.includes(action.payload)
      );
      console.log(allGamesFiltered)
      return {
        ...state,
       filteredVideogames: allGamesFiltered
      };   

    case FILTER_BY_CREATOR:
        const filteredGames = state.videogames.filter((game) => {
            const regExp = /^[0-9]+$/;
            if(action.payload === "API" && regExp.test(game.id)) {
                return true;
            }
            if(action.payload === "DATABASE" && !regExp.test(game.id)){
                return true
            } 
            if(action.payload === "ALL") return true; 
        });
        console.log(filteredGames);
        return {
            ...state,
           filteredVideogames: filteredGames

        }
        case ORDER_RATING:
            const sortedRatingGames = mergeSort(
              state.videogames.slice(),
              action.payload === "Ascendente" ? 'asc' : 'desc',
              'rating' 
            );
            console.log(sortedRatingGames);
            return {
              ...state,
              filteredVideogames: sortedRatingGames,
            };
          
          
    
    //    return {
    //     ...state,
    //     filteredVideogames:
    //     action.payload === "Ascendente"
    //     ? state.videogames.sort((a,b) => (a.rating < b.rating ? -1 : 1))
    //     : state.videogames.sort((a,b) => a.rating > b.rating ? -1 : 1)
    //    }   

       case DELETE_FILTERS: 
         return {
            ...state,
            //videogames: state.videogames
            filteredVideogames: state.videogames
         }
  

 
        default:
            return {...state}
    };
} 

export default rootReducer;   



