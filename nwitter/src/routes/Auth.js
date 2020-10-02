import React, { useState } from 'react';
import { authService } from 'myFirebase';

// export default () => <span>Auth</span>;

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

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
    }
  };
  //firebase 로그인 확인하기
  //Application > IndexedDb > firebaseLoacalStorage

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="email" placeholder="email" value={email} onChange={onChange} required />
        <input name="password" type="password" placeholder="password" value={password} onChange={onChange} required />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
      </form>

      <div>
        <button type="button">continue with google</button>
        <button type="button">continue with github</button>
      </div>

    </div>
  );
}
export default Auth;