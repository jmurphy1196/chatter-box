import React, { Component } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import styled from "styled-components";
import Message from "../components/Message";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      content: "",
      readError: null,
      writeError: null,
      valid: true,
    };
  }
  async componentDidMount() {
    this.setState(() => {
      return {
        readError: null,
      };
    });
    try {
      db.ref("chats").on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        this.setState(() => {
          return {
            chats,
          };
        });
      });
    } catch (error) {
      this.setState(() => {
        return {
          readError: error.message,
        };
      });
    }
  }

  handleChange = (event) => {
    let value = event.target.value;
    if (value.length >= 100) {
      this.setState(() => {
        return {
          valid: false,
        };
      });
    } else {
      this.setState(() => {
        return {
          content: value,
          valid: true,
        };
      });
    }
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    let element = document.querySelector(".chats");

    let now = Date.now();
    this.setState(() => {
      return {
        writeError: null,
      };
    });
    if (this.state.content.length < 100) {
      try {
        await db.ref("chats").push({
          content: this.state.content,
          timestamp: now,
          uid: this.state.user.uid,
          from: this.state.user.email,
          photo: this.state.user.photoURL,
        });
        this.setState(() => {
          return {
            content: "",
          };
        });
        element.scrollTop = element.scrollHeight;
      } catch (error) {
        this.setState(() => {
          return {
            writeError: error.message,
          };
        });
      }
    }
  };
  render() {
    let contentClass = "form-control";
    let submitClass = "btn btn-primary";
    if (this.state.valid === false) {
      contentClass = "form-control is-invalid";
      submitClass = "btn invalid";
    }
    return (
      <ChatWrapper className=' panel-body'>
        <div className='chats'>
          {this.state.chats.map((chat) => {
            return <Message data={chat} />;
          })}
        </div>
        {/* message form */}
        <form onSubmit={this.handleSubmit}>
          <div className='form-group row'>
            <div className='message'>
              <input
                placeholder='Message...'
                className={contentClass}
                onChange={this.handleChange}
                value={this.state.content}
              ></input>
            </div>
            {this.state.error ? <p>{this.state.writeError}</p> : null}
            <div className='submit'>
              <button className={submitClass} type='submit'>
                {this.state.valid === true ? (
                  <i className='fa fa-paper-plane' aria-hidden='true'></i>
                ) : (
                  <i
                    className='fa fa-exclamation-triangle'
                    aria-hidden='true'
                  ></i>
                )}
              </button>
            </div>
          </div>
        </form>
      </ChatWrapper>
    );
  }
}

const ChatWrapper = styled.div`
  position: relative;
  width: 100vw;

  height: 90vh;
  .invalid {
    color: white;
    background-color: red;
  }
  form {
    position: fixed;
    top: 1;
    bottom: 0;
    left: 0;
    margin-left: 5px;
    background: white;

    height: 6.5vh;
  }
  .message {
    position: relative;
    width: 89vw;

    margin-left: 10px;
  }
  .submit {
    position: relative;
    width: 10vw;

    overflow: hidden;
  }
  .chats {
    position: relative;
    width: 100vw;
    height: 85vh;
    overflow-y: scroll;
  }

  @media only screen and (max-width: 400px) {
    i {
      font-size: 0.9rem;
    }
  }
`;
