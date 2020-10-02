import { authService } from "myFirebase";
import React from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  }
  return (
    <>
      <button type="button" onClick={onLogOutClick}>log out</button>
    </>
  )
};