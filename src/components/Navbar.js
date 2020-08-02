import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Navbar() {
  return (
    <NavWrapper className='navbar navbar-expand-lg navbar-light bg-light'>
      <Link to='/home'>
        <span id='chatter'>Chatter</span>
        <span id='box'>Box</span>
      </Link>
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav navbar-right ml-auto'>
          <li id='log' className='nav-item active'>
            <Link to='/login'>login </Link>
          </li>
          <li>/</li>
          <li id='sign' className='nav-item active'>
            <Link to='/signup'>signup</Link>
          </li>
        </ul>
      </div>
    </NavWrapper>
  );
}

const NavWrapper = styled.div`
  #chatter {
    color: teal;
    font-size: 1.4rem;
  }
  #box {
    color: orange;
    font-size: 1.4rem;
  }
  p {
    font-size: 1.4rem;
  }
  #log {
    margin-right: 5px;
    font-size: 1.4rem;
  }
  #sign {
    margin-left: 5px;
    font-size: 1.4rem;
  }
  li {
    font-size: 1.4rem;
  }
`;
