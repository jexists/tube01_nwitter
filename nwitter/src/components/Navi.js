import React from "react";
import {Link} from "react-router-dom";

const Navi = () => 
  <nav>
    <ul>
      <li>
        <Link to="/">home</Link>      
      </li>
      <li>
        <Link to="/profile">my profile</Link>      
      </li>
    </ul>
  </nav>
export default Navi;