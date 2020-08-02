import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <HomeWrapper>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h1 className='title text-center'>
              Welcome to <span id='chatter'>Chatter</span>
              <span id='box'>Box</span>
              <p>
                please <Link to='/login'>login</Link> or{" "}
                <Link to='/signup'>signup</Link>
              </p>
            </h1>
          </div>
        </div>
      </div>
    </HomeWrapper>
  );
}

const HomeWrapper = styled.div`
  .title {
  }
  #chatter {
    color: teal;
  }
  #box {
    color: orange;
  }
  margin-top: 30vh;
  p {
    font-size: 1rem;
  }
`;
