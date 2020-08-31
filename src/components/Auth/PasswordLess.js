import React, { Component } from "react";
import { connect } from "react-redux";
import { ReqProcess } from "../../store/actions/authActions";
import { PasswordLessLogIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";

class PasswordLessSignIn extends Component {
  state = {};
  handleChange = e => {
    this.setState({
      email: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.passLessSignIn(this.state.email);
    this.props.history.push("/");
  };
  render() {
    const { emailSend, auth } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    console.log(emailSend);
    if (emailSend) {
      this.props.reqProcess();
    }
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={this.handleChange}
              type="email"
              className="form-control"
            />
          </div>
          <div>
            <button className="btn btn-outline-danger">Get Email</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    emailSend: state.auth.emailSend
  };
};
const mapDispatchToProps = dispatch => {
  return {
    passLessSignIn: email => dispatch(PasswordLessLogIn(email)),
    reqProcess: () => dispatch(ReqProcess())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordLessSignIn);
