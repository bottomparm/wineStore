import axios from 'axios'

// ACTION TYPES
const GET_FEATURED_WINES = 'GET_FEATURED_WINES'
const GET_SINGLE_WINE = 'GET_SINGLE_WINE'

const GET_ALL_WINES = 'GET_ALL_WINES'

// ACTION CREATORS

const getFeaturedWines = wines => ({
  type: GET_FEATURED_WINES,
  wines
})

const getSingleWine = wine => ({
  type: GET_SINGLE_WINE,
  wine
})

const getAllWines = allWines => ({
  type: GET_ALL_WINES,
  allWines
})

// THUNK CREATORS

export const thunk_gotFeaturedWines = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/wines')
    dispatch(getFeaturedWines(data))
  } catch (err) {
    console.error(err)
  }
}

export const thunk_gotSingleWine = wineId => {
  return async dispatch => {
    const response = await axios.get(`/api/wines/${wineId}`)
    dispatch(getSingleWine(response.data))
  }
}

export const thunk_gotAllWines = () => {
  return async dispatch => {
    const response = await axios.get('/api/wines/allWines')
    const action = getAllWines(response.data)
    dispatch(action)
  }
}

// INITIAL STATE
const initialState = {
  featuredWines: [],
  singleWine: {},
  AllWines: []
}

// WINE SUB-REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FEATURED_WINES:
      return {...state, featuredWines: action.wines}
    case GET_SINGLE_WINE:
      return {...state, singleWine: action.wine}
    case GET_ALL_WINES:
      return {...state, wines: action.allWines}
    default:
      return state
  }
}
