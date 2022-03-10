const LOAD_CATEGORIES = 'event/LOAD_CATEGORIES';

const loadCategories = categories => ({
  type: LOAD_CATEGORIES,
  categories
})

export const getEventCategories = () => async dispatch => {
  console.log("hi from geteventCate action creator")

  const response = await fetch('/api/categories');

  console.log("LOLOLOLO from geteventCate action creator")

  if (response.ok) {
    const categories = await response.json();
    dispatch(loadCategories(categories));
  }
}

const initialState = {}

const categoryReducer = (state = initialState, action) => {

  switch (action.type) {
    case LOAD_CATEGORIES:
      // const allCategories = {}
      // action.list.forEach(cate => {
      //   allCategories[cate.id] = cate;
      // })
      return {
        ...state,
        categories: action.categories
      }

    default:
      return state;
  }
}

export default categoryReducer;
