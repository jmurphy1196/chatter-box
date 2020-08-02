import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signup, signInWithGoogle, signInWithGitHub } from "../helpers/auth";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null,
    };
  }

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState(() => {
      return {
        error: "",
      };
    });
    try {
      await signup(this.state.email, this.state.password);
    } catch (error) {
      this.setState(() => {
        return {
          error: error.message,
        };
      });
    }
  };
  googleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState(() => {
        return {
          error: error.message,
        };
      });
    }
  };
  githubSignIn = async () => {
    try {
      await signInWithGitHub();
    } catch (error) {
      this.setState(() => {
        return {
          error: error.message,
        };
      });
    }
  };

  render() {
    return (
      <div className='container'>
        <form className='form-group' onSubmit={this.handleSubmit}>
          <h1>
            Sign up for <Link to='/'>ChatterBox</Link>!
          </h1>
          <p>Fill in the form below to create an account.</p>
          <div className='form-group p-2'>
            <label for='email' className=''>
              Email:
            </label>
            <input
              className='form-control'
              placeholder='Email'
              name='email'
              type='email'
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div className='form-group p-2'>
            <label for='password' className=''>
              Password:
            </label>
            <input
              className='form-control'
              placeholder='password'
              name='password'
              onChange={this.handleChange}
              value={this.state.password}
              type='password'
            />
          </div>
          <div className='form-group'>
            {this.state.error ? <p>{this.state.error}</p> : null}
            <button className='btn btn-primary' type='submit'>
              Sign Up
            </button>
            <p className='my-2'>Or sign up with </p>
            <button
              onClick={this.googleSignIn}
              type='button'
              className='btn p-1'
            >
              <img
                style={{ width: "40px" }}
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png'
                alt='Google "G" Logo.svg'
              />
            </button>
            <button onClick={this.githubSignIn} type='button' className='btn'>
              <img
                style={{ width: "40px" }}
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png'
                alt='Octicons-mark-github.svg'
              />
            </button>
          </div>
          <hr></hr>
          <p>
            already have an account? go to <Link to='/login'>Login</Link>{" "}
          </p>
        </form>
      </div>
    );
  }
}
