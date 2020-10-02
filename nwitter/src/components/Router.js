import React, { useState } from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navi from "components/Navi";
import MyProfile from "routes/MyProfile";

const AppRouter = ({ isLoggedIn }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      {isLoggedIn && <Navi />}
      <Switch>
        {isLoggedIn ?
          <>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route exact path="/profile">
              <MyProfile />
            </Route>
            <Redirect from="*" to="/" />
          </>
          :
          <>
          <Route exact path="/">
            <Auth></Auth>
          </Route>
          <Redirect from="*" to="/" />
          </>
        }
      </Switch>
    </Router>
  )
}
export default AppRouter;