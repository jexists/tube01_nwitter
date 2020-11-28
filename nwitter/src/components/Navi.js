import React from "react";
import { Link } from "react-router-dom";

const Navi = ({ userObj }) =>
  <nav>
    <ul>
      <li>
        <Link to="/">home</Link>
      </li>
      <li>
        <Link to="/profile">{userObj.displayName}`s profile</Link>
      </li>
    </ul>
  </nav>
export default Navi;