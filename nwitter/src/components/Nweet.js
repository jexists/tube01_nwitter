import { dbService } from "myFirebase";
import React from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const onDeleteClick = async () => {
    const ok = window.confirm ("정말로 게시글을 삭제하시겠습니까?");
    console.log(ok);
    if (ok) {
      //delete nweet
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
    }
  }
  return (
    <div>
      <h4>{nweetObj.text}</h4>
      {isOwner && (
        <>
          <button type="buttton" onClick={onDeleteClick}>delete</button>
          <button type="buttton">edit</button>
        </>
      )}
    </div>
  )
};

export default Nweet;