import { csrfFetch } from "./csrf";

const LOAD_CATEGORIES = 'event/LOAD_CATEGORIES';

const loadCategories = categories => ({
  type: LOAD_CATEGORIES,
  categories
})

export const getEventCatogories = () => async dispatch => {
  const response = await fetch('/api/event/categories');

  if (response.ok) {
    const categories = await response.json();
    dispatch(loadCategories(categories));
  }
}

const initialState = {
  categories: [],
}

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      }
    default:
      return state;
  }
}

export default eventReducer;
