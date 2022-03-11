// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import AddEventFormPage from "./components/AddEventFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import EventsBrowser from "./components/EventsBrowser";
import EventDetail from "./components/EventDetail";
import EditEventFormPage from "./components/EditEventFormPage";
import splashImg from '../src/images/homepage2.jpg'
import MyTickets from "./components/MyTickets";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />

      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <EventsBrowser />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/add-event">
            <AddEventFormPage />
          </Route>
          <Route exact path="/event/:id/detail">
            <EventDetail />
          </Route>
          <Route path="/event/:id/edit">
            <EditEventFormPage />
          </Route>
          <Route path="/tickets/users/:id">
            <MyTickets />
          </Route>
          <Route>
            Page Not Found
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
