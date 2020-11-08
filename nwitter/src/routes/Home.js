import React, { useEffect, useState } from "react";
import { dbService, deService } from "myFirebase";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  // const getNweets = async() => {
  //   // 데이터 받기
  //   const dbNweets = await dbService.collection("nweets").get()
  // forEach 방식 vs array.map 방식
  //   // dbNweets.forEach((document) => console.log(document.data()))
  //   dbNweets.forEach((document) => {
  //     const nweetObject = {
  //       ...document.data(),
  //       id: document.id,
  //     }
  //     // setNweets((prev) => [document.data(), ...prev]);
  //     setNweets((prev) => [nweetObject, ...prev]);
  //   });
  //   // console.log(nweets);
  // };
  useEffect(() => {
    // getNweets();

    // forEach 방식 vs array.map 방식
    //array.map => no re-render(더 빠르게 실행)
    dbService.collection("nweets").onSnapshot(snapshot => {
      console.log(snapshot.docs);
      const nweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(nweetArray);
      setNweets(nweetArray);
    });
  }, [])
  const onSubmit = async (event) => {
    event.preventDefault();
    // 데이터 전송
    await dbService.collection("nweets").add({
      text: nweet,
      createdDate: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet("");
  }
  const onChange = (event) => {
    const { target: { value } } = event; //event안에 있는 target안에 있는 value
    setNweet(value);
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="글작성하세요" maxLength={120} value={nweet} onChange={onChange} />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}
  ;

export default Home;