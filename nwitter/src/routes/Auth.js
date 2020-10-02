import React, { useState } from 'react';
import { authService, firebaseInstatnce } from 'myFirebase';

// export default () => <span>Auth</span>;

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    // console.log(event.target.name);
    const { target: { name, value } } = event;
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }
  const onSubmit = async (event) => {
    event.preventDefault(); //새로고침X
    try {
      let data;
      if (newAccount) {
        //회원가입
        data = await authService.createUserWithEmailAndPassword(
          email, password
        )
      } else {
        //로그인
        data = await authService.signInWithEmailAndPassword(
          email, password
        );
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount(prev => !prev);
  //firebase 로그인 확인하기
  //Application > IndexedDb > firebaseLoacalStorage

  //sns
  const onSocialClick = async (event) => {
    console.log(event.target.name);
    const {target: {name},} = event;

    let provider;

    if (name === 'google') {
      provider = new firebaseInstatnce.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstatnce.auth.GithubAuthProvider();
    }
    
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="email" placeholder="email" value={email} onChange={onChange} required />
        <input name="password" type="password" placeholder="password" value={password} onChange={onChange} required />
        <input type="submit" value={newAccount ? "Create Account" : "sign In"} />
      </form>

      {error}
      <span onClick={toggleAccount}>{newAccount ? "sign in" : "create Account"}</span>

      <div>
        <button name="google" type="button" onClick={onSocialClick}>continue with google</button>
        <button name="github" type="button" onClick={onSocialClick}>continue with github</button>
      </div>

    </div>
  );
}
export default Auth;