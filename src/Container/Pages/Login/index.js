import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../Component/Atoms/Button";
import { loginUserAPI } from "../../../Config/Redux/Action";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChangeText = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmitLogin = async () => {
    const { email, password } = this.state;
    const { history } = this.props;
    console.log("before send :", email, password);
    const res = await this.props
      .loginApi({ email, password })
      .catch(err => err);
    if (res) {
      console.log("login Succees", res);
      localStorage.setItem("User", JSON.stringify(res));
      this.setState({
        email: "",
        password: ""
      });
      history.push("/");
    } else {
      console.log("login Gagal");
      history.push("/register");
    }
  };
  render() {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p className="auth-title">Login Page </p>
          <input
            autoComplete="off"
            className="Input"
            name="email"
            placeholder="Email"
            type="text"
            onChange={this.handleChangeText}
            value={this.state.email}
          />
          <input
            className="Input"
            name="password"
            placeholder="Password"
            type="password"
            onChange={this.handleChangeText}
            value={this.state.password}
          />
          <Button
            title="Login"
            onClick={this.handleSubmitLogin}
            loading={this.props.isLoading}
          />
          <button className="btn">
            <Link to="/register">Go to Register</Link>
          </button>
        </div>
      </div>
    );
  }
}

const reduxState = state => ({
  isLoading: state.isLoading
});

const reduxDispatch = dispatch => ({
  loginApi: data => dispatch(loginUserAPI(data))
});
export default connect(
  reduxState,
  reduxDispatch
)(Login);
