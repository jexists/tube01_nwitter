import React, { useState } from 'react';

// export default () => <span>Auth</span>;

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (event) => {
    // console.log(event.target.name);
    const {target: {name, value}} = event;
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }
  const onSubmit = (event) => {
    event.preventDefault();
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="text" placeholder="email" value={email} onChange={onChange} required />
        <input name="password" type="password" placeholder="password" value={password} onChange={onChange} required />
        <input type="submit" value="log in" />
      </form>

      <div>
        <button type="button">continue with google</button>
        <button type="button">continue with github</button>
      </div>
    
    </div>
  );
}
export default Auth;