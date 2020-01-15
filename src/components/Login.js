import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser, setErrorLogin } from "../Redux/actions/authActions";
import classnames from "classnames";
import "../styles/login.css";
import "antd/dist/antd.css";
import { Form, Input, Button, Spin, notification } from "antd";

const openNotificationWithIcon = type => {
  notification[type]({
    message: "User Not Found",
    description: "We coudn't find a User with this email id"
  });
};

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      spinnerLoading: false,
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
        errors: nextProps.errors,
        showNotification: true
      });

      if (nextProps.errors.loginError === true) {
        this.setState({ spinnerLoading: false });
        openNotificationWithIcon("error");
        this.props.setErrorLogin(false);
      }
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ spinnerLoading: true });
        console.log(this.state);
        console.log("Received values of form: ", values);
        const userData = {
          email: values.email,
          password: values.password,
          application: "golfapp"
        };

        this.props.loginUser(userData);
      }
    });
  };

  render() {
    const { errors } = this.state;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <div className="c-login-wrapper">
        <div className="h-100 row">
        <div className="auth-form mx-auto my-auto col-md-5 col-lg-3 col-11">
        <div class="c-login card ">
          <div className="login-body card-body">
          <h1 className="mb-4">Login</h1>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item  label="E-mail">
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "The input is not valid E-mail!"
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please input your password!"
                  }
                ]
              })(<Input.Password />)}
            </Form.Item>

            <Button
              disabled={this.state.spinnerLoading}
              className="d-table mx-auto btn btn-accent btn-pill mt-3"
              htmlType="submit"
            >
              <Spin
                className="c-login__spinner"
                spinning={this.state.spinnerLoading}
              >
                Let me in
              </Spin>
            </Button>
          </Form>
          </div>
        </div>
        </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  setErrorLogin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const WrappedLoginForm = Form.create({ name: "login" })(Login);

export default connect(mapStateToProps, { loginUser, setErrorLogin })(
  WrappedLoginForm
);
