import React from "react";

const Nweet = ({ nweetObj, isOwner }) => (
  <div>
    <h4>{nweetObj.text}</h4>
    {isOwner && (
      <>
        <button type="buttton">delete</button>
        <button type="buttton">edit</button>
      </>
    )}
  </div>
);

export default Nweet;