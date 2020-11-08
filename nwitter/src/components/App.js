import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
// import { myFirebase } from "myFirebase";
import { authService } from "myFirebase";

function App() {
  // console.log(authService.currentUser); //null;
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[])
  
  // setInterval(() => {
  //   console.log(authService.currentUser);
  // }, 2000);

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "initializing..." }
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
