import { authService, dbService } from "myFirebase";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ({ userObj }) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid) //filter
      // .orderBy("creatorAt", "desc")
      //firebase == noSQL => index필요 (에러) =>복합색인 만들기
      .orderBy("creatorAt")
      .get();
    console.log(nweets.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyNweets();
  }, [])
  return (
    <>
      <button type="button" onClick={onLogOutClick}>log out</button>
    </>
  )
};