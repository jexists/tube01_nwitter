import { authService, dbService } from "myFirebase";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ({ userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
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

  const onSubmit = async (event) => {
    event.preventDefault();
    if(userObj.displayName !== newDisplayName) {
      console.log(userObj.updateProfile);
      await userObj.updateProfile({
        displayName: newDisplayName,
      })
    }
  };
  const onChange = (event) => {
    const {
      target: {value},
    } = event;
    setNewDisplayName(value);
  }
  useEffect(() => {
    getMyNweets();
  }, [])
  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} placeholder="이름을 적어주세요" value={newDisplayName} />
        <input type="submit" value="update" />
      </form>
      <button type="button" onClick={onLogOutClick}>log out</button>
    </>
  )
};