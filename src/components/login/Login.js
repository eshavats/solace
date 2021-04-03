import React, { Component } from "react";
import axios from "axios";
import { message } from "antd";
import "./Login.css";
import CoronaImg from "./img/corona1.gif";

class Login extends Component {
  state = { email: "", password: "" };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      const {token} = await axios.post(
        `https://solace-hack-kj.herokuapp.com/api/users/sign-in`,
        {
          email,
          password,
        }
      );
      message.success({
        content: "Logged In Successfully!",
        duration: 5,
        className: "my-message",
      });
    } catch (error) {
      message.error({
        content: "Login Failed!",
        duration: 5,
        className: "my-message",
      });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ ...this.state, [name]: value });
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="container-fluid p-0">
            <div className="row m-0">
              <div className="col-lg-6 p-0">
                <img src={CoronaImg} className="img-responsive fit-image" />
              </div>
              <div className="col-lg-6  align-self-center p-0">
                <div className="row m-0 justify-content-center">
                  <form
                    className="mt-0"
                    data-aos="zoom-in"
                    onSubmit={this.handleSubmit}
                  >
                    <div className="logdet">Login</div>

                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder="Enter Email"
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder="Enter Password"
                      />
                    </div>

                    <div
                      className=" form-group d-flex justify-content-center"
                      id="btn"
                    >
                      <button
                        type="submit"
                        formaction="homepage.html"
                        className="btn btn-block"
                      >
                        Sign In
                      </button>
                    </div>
                    <p className="foot">
                      Don't have an account?
                      <a
                        href="/"
                        style={{ color: "#ce907e", paddingLeft: "3px" }}
                      >
                        Sign Up
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
