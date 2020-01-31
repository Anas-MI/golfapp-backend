import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser, setErrorLogin } from "../Redux/actions/authActions";
import classnames from "classnames";
import "../styles/login.css";
import "antd/dist/antd.css";
import { Form, Input, Button, Spin, notification } from "antd";
import Axios from "axios";
import apiList from "../services/apis/apiList";

const { resetPasswordApi } = apiList;
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
      disable: true
    };
  }

  componentDidMount() {
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push("/dashboard");
    // }
    console.log(this.props);
    let query = new URLSearchParams(this.props.location.search);
    const userId = query.get("token");
    this.setState({ userId });
    console.log({ userId });
    if (userId) {
      // Axios.post(resetPasswordApi, {userId, password})
    }
  }

  //   componentWillReceiveProps(nextProps) {
  //     if (nextProps.auth.isAuthenticated) {
  //       this.props.history.push("/dashboard"); // push user to dashboard when they login
  //     }

  //     if (nextProps.errors) {
  //       this.setState({
  //         errors: nextProps.errors,
  //         showNotification: true
  //       });

  //       if (nextProps.errors.loginError === true) {
  //         this.setState({ spinnerLoading: false });
  //         openNotificationWithIcon("error");
  //         this.props.setErrorLogin(false);
  //       }
  //     }
  //   }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    console.log(this.state);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ spinnerLoading: true });
        console.log(this.state);
        console.log("Received values of form: ", values);
        const userData = {
          userId: this.state.userId,
          password: values.password
        };
        console.log({ userData });
        Axios.post(resetPasswordApi, userData)
          .then(data => {
            console.log({ data });
        this.setState({ spinnerLoading: false });
        window.location.href = "https://www.fitforgolfusa.com/";
          })
          .catch(error => {
            console.log({ error });
          });
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
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
    console.log(this.props);
    return (
      <div className="c-login-wrapper">
        <div className="h-100 row">
          <div className="auth-form mx-auto my-auto col-md-6 col-lg-5 col-11">
            <div class="c-login card ">
              <div className="login-body card-body">
                <h5 className="mb-4">Reset Your Password</h5>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                  {/* <Form.Item  label="E-mail">
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
            </Form.Item> */}
                  <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator("password", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your password!"
                        },
                        {
                          validator: this.validateToNextPassword
                        }
                      ]
                    })(<Input.Password />)}
                  </Form.Item>
                  <Form.Item label="Confirm Password" hasFeedback>
                    {getFieldDecorator("confirm", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your password!"
                        },
                        {
                          validator: this.compareToFirstPassword
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
                      Reset Password
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
