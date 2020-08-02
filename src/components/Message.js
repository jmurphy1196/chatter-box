import React from "react";
import styled from "styled-components";

export default function Message(props) {
  const { content, from, photo } = props.data;
  if (photo === undefined || photo === null) {
    return (
      <ChatWrapper>
        <p>
          {content} - {from}
        </p>
      </ChatWrapper>
    );
  } else {
    return (
      <ChatWrapper>
        <p>
          {content} - <img src={photo} />
        </p>
      </ChatWrapper>
    );
  }
}

const ChatWrapper = styled.div`
  img {
    width: 35px;
    border-radius: 50%;
  }
  p {
    font-family: arial;
    margin-left: 20px;
  }
`;
