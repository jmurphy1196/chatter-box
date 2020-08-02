import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin, signInWithGoogle, signInWithGitHub } from "../helpers/auth";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      email: "",
      password: "",
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
      await signin(this.state.email, this.state.password);
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
        <form autoComplete='off' onSubmit={this.handleSubmit}>
          <h1>
            Login to <Link to='/'>ChatterBox!</Link>
          </h1>
          <p>fill in the form below to login to your account</p>
          <div className='form-group'>
            <input
              placeholder='email'
              name='email'
              type='email'
              onChange={this.handleChange}
              value={this.state.email}
              className='form-control'
            />
          </div>
          <div className='form-group'>
            <input
              placeholder='password'
              name='password'
              type='password'
              onChange={this.handleChange}
              value={this.state.password}
              className='form-control'
            />
          </div>
          <div className='form-group'>
            {this.state.error ? <p>{this.state.error}</p> : null}
            <button type='submit' className='btn btn-primary'>
              Login
            </button>
          </div>
          <hr />
          <p>
            Don't have an account? <Link to='/signup'>Sign up</Link>
          </p>
        </form>
      </div>
    );
  }
}
