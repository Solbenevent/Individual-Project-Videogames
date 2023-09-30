import axios, { all } from "axios";
import { GET_GAMES, GET_DETAIL, GET_GENRES, DELETE_FILTERS, ORDER_ASC_RATING, ORDER_DESC_RATING, FILTER_BY_GENRE, FILTER_BY_CREATOR, SET_PAGE, CREATE_VIDEOGAME, ORDER_BY_API, SEARCH_GAME_BY_NAME, CLEAR_DETAIL, ORDER_RATING, ORDER_ALPHABETIC} from "./actionTypes";

export const getVideogames = () => {
   return  async (dispatch) => {
  await axios.get("http://localhost:3001/videogames")
   .then(response => {
    dispatch({ type: GET_GAMES, payload: response.data})
    console.log(response.data)
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
         console.log(response.data)
      })
   }
}

export const clearDetail = () => {
  return {
    type: CLEAR_DETAIL
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

export const filterByGenre = (genre) => {
  return {
    type: FILTER_BY_GENRE,
    payload: genre,
  }
};

export const orderByCreator = (origin) => {
  return {
    type: FILTER_BY_CREATOR,
    payload: origin,
  }
};

export const orderAlphabetic = (order) => {
  return {
    type: ORDER_ALPHABETIC,
    payload: order
  }
}

export const orderByRating = (rating) => {
  return {
    type: ORDER_RATING,
    payload: rating
  }
}

export const deleteFilters = () => {
  return {
    type: DELETE_FILTERS,
  }
}


 export const setPage = (page) => {
  return {
    type: SET_PAGE,
    payload: page,
  }
 }





 
 