import { csrfFetch } from "./csrf";

const SET_SESSION_USER = "session/SET_SESSION_USER";
const REMOVE_SESSION_USER = "session/REMOVE_SESSION_USER";

const setSessionUser = (user) => ({
  type: SET_SESSION_USER,
  payload: user
})

const removeSessionUser = (session) => ({
  type: REMOVE_SESSION_USER,
})

export const loginUser = (user) => async(dispatch) => {
  const { credential, password } = user
  const res = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password})
  });

  if (res.ok) {
    const data  = await res.json();
    console.log("data!!!!", data)
    dispatch(setSessionUser(data.user))
  }
}

// export const logoutUser = () => async(dispatch) => {
//   dispatch(removeSessionUser());
// }


const initialState = { user: null };

const sessionReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case SET_SESSION_USER: {
      const newState = {...state};
      newState.user = action.payload
      return newState;
    }
    case REMOVE_SESSION_USER: {
      const newState = {...state}
      newState.user = null;
      return newState;
    }
    default:
      return state;
  }
}

export default sessionReducer;
