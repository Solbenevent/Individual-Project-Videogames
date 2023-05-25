import axios, { all } from "axios";
import { GET_GAMES, GET_DETAIL, GET_GENRES, ORDER_ASC_RATING, ORDER_DESC_RATING, FILTER_BY_GENRE, ORDER_BY_CREATOR, SET_PAGE, CREATE_VIDEOGAME, ORDER_BY_API, SEARCH_GAME_BY_NAME} from "./actionTypes";

export const getVideogames = () => {
   return  async (dispatch) => {
  await axios.get("http://localhost:3001/videogames")
   .then(response => {
    dispatch({ type: GET_GAMES, payload: response.data})
   })
}
}

export const searchGameByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/videogames/name?name=${name}`);
      return dispatch({
        type: SEARCH_GAME_BY_NAME,
        payload: response.data,
      })
    } catch (error) {
      console.log(error);
    }
  }
}


export const getVideogameDetail = (idVideogame) => {
   return async (dispatch) => {
     await axios.get(`http://localhost:3001/videogames/${idVideogame}`)
      .then(response => {
         dispatch({type: GET_DETAIL, payload: response.data})
      })
   }
}

export const getGenres =  () => {
  return async (dispatch) => {
     await axios.get(`http://localhost:3001/genres`)
    .then(res => {
      dispatch({
         type: GET_GENRES,
         payload: res.data
      })
    })
  }
}

export const orderDesc = (type) => (dispatch, getState) => {
  const filtered = getState().videogames;

  let videogamesOrder = [];
   if(type === "desc_name") {
     videogamesOrder = filtered.sort((a, b) => {
      if(a.name < b.name) return 1;
      if(a.name > b.name) return -1;
      return 0;
     });
  } else if(type === "desc_rating") {
   videogamesOrder = filtered.sort((a, b) => b.rating - a.rating);
  }
  dispatch({
   type: ORDER_DESC_RATING,
   payload: {
      videogamesOrder,
      name: type,
   }
  });
}

export const orderAsc = (type) => (dispatch, getState) => {
   const filtered = getState().videogames;
   let videogamesOrder = []
 
     if (type === "asc_name") {
       videogamesOrder = filtered.sort((a, b) => {
         if (a.name > b.name) return 1;
         if (a.name < b.name) return -1;
         return 0;
       });
     } else if (type === "asc_rating") {
       videogamesOrder = filtered.sort(
         (a, b) => a.rating - b.rating
       );
     }
     dispatch({
       type: ORDER_ASC_RATING,
       payload: {
         videogamesOrder,
         name: type,
       },
     });
 }

export const orderByCreator = (origin) => {
    return  async (dispatch) => {
      await axios.get(`http://localhost:3001/videogames?origin=${origin}`)
       .then(response => {
        dispatch({ type: FILTER_BY_GENRE, payload: response.data})
       })
    }
 
}


export const filterByGenre = (genre) =>  {
  return  async (dispatch) => {
    await axios.get(`http://localhost:3001/videogames?genre=${genre}`)
     .then(response => {
      dispatch({ type: FILTER_BY_GENRE, payload: response.data})
     })
  }

 };

 export const setPage = (page) => {
  return {
    type: SET_PAGE,
    payload: page,
  }
 }

 export const createVideogame = (gameData) => {
  return async (dispatch) => {
    await axios.post("http://localhost:3001/videogame", gameData)
    .then(({ data }) => {
      return dispatch({
        type: CREATE_VIDEOGAME,
        payload: data,
      });
    });   
    
  }
 };
 