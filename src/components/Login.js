import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../Redux/actions/authActions";
import classnames from "classnames";
import "../styles/login.css";
import  DefaultLayout  from "../layouts/Default";
import { Container, Row, Col } from "shards-react";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    return (
    
      <Container fluid>
      <Row>
      <div className="c-login-wrapper">
        <div class="c-login">
          <h1>Login</h1>
          <form method="post">
            <input
              type="text"
              name="u"
              placeholder="Username"
              required="required"
              />
            <input
              type="password"
              name="p"
              placeholder="Password"
              required="required"
            />
            <button type="submit" class="btn btn-primary btn-block btn-large">
              Let me in.
            </button>
          </form>
        </div>
      </div>
      </Row>
    </Container>
    

    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, { loginUser })(Login);
