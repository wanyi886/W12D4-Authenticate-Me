import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  
  return (
    <>
    <h1>This is App</h1>
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
    </Switch>
    </>
  );
}

export default App;
