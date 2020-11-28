import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
// import { myFirebase } from "myFirebase";
import { authService } from "myFirebase";

function App() {
  // console.log(authService.currentUser); //null;
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        // setIsLoggedIn(true);
        // setUserObj(user);
        // } else {
        //   setIsLoggedIn(false);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
        // setUserObj(user);
      }
      setInit(true);
    });
  }, [])
  const refreshUser = () => {
    // setUserObj(authService.currentUser); 
      //not working => 내용이 많아서 변경힘듬
    // setUserObj({displayName:"changed"});
    console.log(authService.currentUser.displayName);
    console.log(authService.currentUser);
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
    // setUserObj(Object.assign({}, user));
  };
  // setInterval(() => {
  //   console.log(authService.currentUser);
  // }, 2000);

  // return (
  //   <>
  //     {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "initializing..." }
  //     <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
  //   </>
  // );
  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "initializing..."}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
