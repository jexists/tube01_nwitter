import React, { useState } from 'react';
import AppRouter from 'components/Router';
// import { myFirebase } from "myFirebase";
import { authService } from "myFirebase";

function App() {
  console.log(authService.currentUser); //null;
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
