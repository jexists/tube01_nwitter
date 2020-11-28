import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { dbService, deService, storageService } from "myFirebase";
import Nweet from "components/Nweet";
import { storage } from "firebase";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");
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
      //onSnapshot = 데이터베이스에 무슨일이 있을때 알림받는 것
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
    let attachmentUrl = "";
    if (attachment != "") {
      const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      console.log(attachmentRef);
      const reponse = await attachmentRef.putString(attachment, 'data_url');
      console.log('reponse', reponse);
      console.log('reponse', await reponse.ref.getDownloadURL());
      attachmentUrl = await reponse.ref.getDownloadURL();
    }
    const nweetObj = {
      text: nweet,
      createdDate: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("nweets").add(nweetObj);
    setNweet("");
    setAttachment("");
    // 데이터 전송
    // await dbService.collection("nweets").add({
    //   text: nweet,
    //   createdDate: Date.now(),
    //   creatorId: userObj.uid,
    // });
    // setNweet("");
  }
  const onChange = (event) => {
    const { target: { value } } = event; //event안에 있는 target안에 있는 value
    setNweet(value);
  }
  const onFileChange = (event) => {
    // console.log(event.target); //null
    // console.log(event.target.files);
    const { target: { files }, } = event;
    // input은 한개의 파일만 받아서 files[0]
    const theFile = files[0];
    console.log(theFile);
    //fileReaderAPI = 파일 이름 읽는 것
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent); //target, result
      const { currentTarget: { result }, } = finishedEvent;
      setAttachment(result)
    }
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => {
    setAttachment(null);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="글작성하세요" maxLength={120} value={nweet} onChange={onChange} />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="auto" />
            <button type="button" onClick={onClearAttachment}>삭제</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
          // <div key={nweet.id}>
          //   <h4>{nweet.text}</h4>
          // </div>
        ))}
      </div>
    </div>
  )
}
  ;

export default Home;