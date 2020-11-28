import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navi from "components/Navi";
import MyProfile from "routes/MyProfile";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      {isLoggedIn && <Navi userObj={userObj}/>}
      <Switch>
        {isLoggedIn ?
          <>
            <Route exact path="/">
              <Home userObj={userObj}></Home>
            </Route>
            <Route exact path="/profile">
              <MyProfile userObj={userObj} refreshUser={refreshUser} />
            </Route>
            {/* <Redirect from="*" to="/" /> */}
          </>
          :
          <>
          <Route exact path="/">
            <Auth></Auth>
          </Route>
          {/* <Redirect from="*" to="/" /> */}
          </>
        }
      </Switch>
    </Router>
  )
}
export default AppRouter;