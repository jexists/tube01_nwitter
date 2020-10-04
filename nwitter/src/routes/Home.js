import React, { useState } from "react";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
  }
  const onChange = (event) => {
    const {target: {value}} = event; //event안에 있는 target안에 있는 value
    setNweet(value);
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="글작성하세요" maxLength={120} value={nweet} onChange={onChange} />
        <input type="submit" value="Nweet" />
      </form>
    </div>
  )
}
  ;

export default Home;