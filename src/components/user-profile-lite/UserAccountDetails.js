import React, { Component } from "react";
import PropTypes from "prop-types";
import apiList from "../../services/apis/apiList";
import axios from "axios";
import { Tag } from "antd";
import {
  validateEmail,
  validateName,
  validateNumber,
  validateState,
  validateCountry
} from "../../utils/validations";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button,
  FormFeedback
} from "shards-react";

export default class UserAccountDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {},
      nameError: false,
      emailError: false,
      device: ""
    };
  }

  componentDidMount() {
    const { updateUserDetailsApi, getUserDetailsApi } = apiList;
    const getUserDetailsRoute = getUserDetailsApi + `${this.props.slug}`;
    axios
      .get(getUserDetailsRoute)
      .then(res => {
        if (res.status === 200) {
          this.setState({ ...res.data });
        }
      })
      .catch(err => {
        console.log({ "Something went wrong": err });
      });
    // axios.post(updateUserDetailsApi, userData).then().catch()
  }

  handleChange(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);

    //Validations

    //Checking for name

    if (name === "name") {
      //Returns nameError true or false depending upon the input

      this.setState(validateName(e.target.value));
    }

    //Checking for email

    if (name === "email") {
      //Returns emailError true or false depending upon the input

      this.setState(validateEmail(e.target.value));
    }

    //Checking for phone number
    if (name === "number") {
      if (name.length > 0) {
        this.setState({ validateNumber: true });
        this.setState(validateNumber(e.target.value));
      } else {
        this.setState({ validateNumber: false });
      }
    }
  }

  // submitForm(e){
  //  e.preventDefault();
  //  const data = {
  //   firstName: this.state.firstName,
  //   lastName: this.state.lastName,
  //   email: this.state.email,
  //   password: this.state.password
  //  }
  //  sendFormData(data).then(res=>{
  //    if(res.status===200){
  //      alert(res.data);
  //      this.props.history.push('/');
  //    }else{

  //    }
  //  });
  // }

  render() {
    const { title, user } = this.props;

    console.log(this.state);

    return (
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form>
                  <Row form>
                    {/* First Name */}
                    <Col md="6" className="form-group">
                      <label htmlFor="feName">Name</label>
                      <FormInput
                        id="feName"
                        placeholder="Name"
                        valid={!this.state.nameError}
                        invalid={this.state.nameError}
                        onChange={this.handleChange.bind(this, "name")}
                        value={this.state.name}
                      />
                      <FormFeedback valid>Name looks good!</FormFeedback>
                      <FormFeedback>
                        Oops, {this.state.nameErrorMsg}
                      </FormFeedback>
                    </Col>
                    {/* Last Name */}
                    <Col md="6" className="form-group">
                      <label htmlFor="feLastName">Phone Number</label>
                      <FormInput
                        id="fePhoneNumber"
                        placeholder="Phone Number"
                        value={user.phone}
                        type="number"
                        maximum={12}
                        valid={
                          !this.state.numberError && this.state.validateNumber
                        }
                        invalid={this.state.numberError}
                        onChange={this.handleChange.bind(this, "number")}
                        value={this.state.number}
                      />
                      <FormFeedback valid>Number looks good!</FormFeedback>
                      <FormFeedback>
                        Oops, {this.state.numberErrorMsg}
                      </FormFeedback>
                    </Col>
                  </Row>
                  <Row form>
                    {/* Email */}
                    <Col md="6" className="form-group">
                      <label htmlFor="feEmail">Email</label>
                      <FormInput
                        type="email"
                        id="feEmail"
                        placeholder="Email Address"
                        valid={!this.state.emailError}
                        invalid={this.state.emailError}
                        value={this.state.email}
                        onChange={this.handleChange.bind(this, "email")}
                        autoComplete="email"
                      />
                      <FormFeedback valid>Email looks good!</FormFeedback>
                      <FormFeedback>
                        Oops, {this.state.emailErrorMsg}
                      </FormFeedback>
                    </Col>
                    <Col md="1" className="form-group"></Col>
                    <Col
                      md="5"
                      align-center
                      style={{ marginTop: "33px" }}
                      className="form-group"
                    >
                      <span>Device Type : </span>
                      {this.state.device.includes("ios") && (
                        <Tag color="magenta">Ios</Tag>
                      )}
                      {this.state.device.includes("android") && (
                        <Tag color="cyan">Android</Tag>
                      )}
                    </Col>
                  </Row>

                  <Row form>
                    <Col md="6" className="form-group">
                      <label htmlFor="feCity">Country</label>
                      <FormInput
                        id="feCity"
                        placeholder="Country"
                        value={this.state.country}
                        onChange={this.handleChange.bind(this, "country")}
                      />
                    </Col>

                    <Col md="4" className="form-group">
                      <label htmlFor="feInputState">State</label>
                      <FormInput
                        id="feCity"
                        placeholder="state"
                        value={this.state.state}
                        onChange={this.handleChange.bind(this, "state")}
                      />
                    </Col>
                  </Row>
                  <Row form></Row>
                  <Button theme="accent">Update Account</Button>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  }
}

UserAccountDetails.propTypes = {
  title: PropTypes.string
};

UserAccountDetails.defaultProps = {
  title: "Account Details"
};
