import React, { useState } from 'react';
import { authService } from 'myFirebase';

// export default () => <span>Auth</span>;

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount]=useState(false);

  const onChange = (event) => {
    // console.log(event.target.name);
    const {target: {name, value}} = event;
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }
  const onSubmit = async (event) => {
    event.preventDefault(); //새로고침X

    if (newAccount) {
      //회원가입
      await authService.createUserWithEmailAndPassword(
        email, password
      )
    } else {
      //로그인
      await authService.signInWithEmailAndPassword(
        email, password
      )

    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="email" placeholder="email" value={email} onChange={onChange} required />
        <input name="password" type="password" placeholder="password" value={password} onChange={onChange} required />
        <input type="submit" value={newAccount ? "Create Account":"Log In"} />
      </form>

      <div>
        <button type="button">continue with google</button>
        <button type="button">continue with github</button>
      </div>
    
    </div>
  );
}
export default Auth;