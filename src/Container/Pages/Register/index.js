import React, { Component } from "react";
import "./Register.scss";
// import firebase from "../../../Config/Firebase";
import Button from "../../../Component/Atoms/Button";
import { connect } from "react-redux";
import { registerUserAPI } from "../../../Config/Redux/Action";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChangeText = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmitRegister = async () => {
    const { email, password } = this.state;
    const {history} = this.props
    console.log("before send :", email, password);
    const res = await this.props
      .registerApi({ email, password })
      .catch(err => err);
    if (res) {
      console.log("Register Berhasil")
      this.setState({
        email: "",
        password: ""
      });
      history.push('/login')
    } else {
      alert("Register Gagal")

    }
  };
  render() {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p className="auth-title">Register Page </p>
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
            title="register"
            onClick={this.handleSubmitRegister}
            loading={this.props.isLoading}
          />
        </div>
        {/* <button>Go to Dashboard</button> */}
      </div>
    );
  }
}

const reduxState = state => ({
  isLoading: state.isLoading
});

const reduxDispatch = dispatch => ({
  registerApi: data => dispatch(registerUserAPI(data))
});

export default connect(
  reduxState,
  reduxDispatch
)(Register);
