import React, { useState } from "react";
import { dbService } from "myFirebase";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("정말로 게시글을 삭제하시겠습니까?");
    console.log(ok);
    if (ok) {
      //delete nweet
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    // console.log(nweetObj, newNweet);
    await dbService.doc(`nweets/${nweetObj.id}`).update({text: newNweet,});
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input type="text" placeholder="수정글을 작성해주세요" value={newNweet} onChange={onChange} required />
            <input type="submit" value="Update Nweet"/>
          </form>
          <button type="button" onClick={toggleEditing}>취소</button>
        </>
      ) : (
          <>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="auto"/>}
            {isOwner && (
              <>
                <button type="buttton" onClick={onDeleteClick}>delete</button>
                <button type="buttton" onClick={toggleEditing}>edit</button>
              </>
            )}
          </>
        )}
    </div>
  );
};

export default Nweet;