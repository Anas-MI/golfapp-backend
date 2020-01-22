import React, { Component } from "react";
import PropTypes from "prop-types";
import apiList from "../../services/apis/apiList";
import axios from "axios";
import { connect } from "react-redux";
import { Upload, Icon } from 'antd';
import {Button as AntdButton} from "antd"; 
import { setUserToUpdate } from "../../Redux/actions/authActions";
import { Tag, message } from "antd";
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

message.config({
  top: 80
});

 class UserAccountDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {},
      nameError: false,
      emailError: false,
      device: "",
      phone: "",
      country: "",
      state: "",
      enable: false
    };
  }

  componentDidMount() {
    const { getUserDetailsApi } = apiList;
    const getUserDetailsRoute = getUserDetailsApi + `${this.props.slug}`;
    axios
      .get(getUserDetailsRoute)
      .then(res => {
        if (res.status === 200) {
          this.setState({ ...res.data });
          this.props.setUserToUpdate({name: this.state.name, _id: this.state.id})
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
    console.log(this.state)
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

    //Enable/disable form submit button
    let { nameError, emailError, numberError } = this.state;
    if (!nameError && !emailError && !numberError) {
      this.setState({ enable: true });
    } else {
      this.setState({ enable: false });
    }
  }

  submitForm(e) {
    e.preventDefault();
    let { nameError, emailError, numberError } = this.state;
    if (!nameError && !emailError && !numberError) {
      const key = "updatingDetails";
      const openMessage = () => {
        message.loading({ content: "Updating Details...", key });
      };
      openMessage();
      const { updateUserDetailsApi } = apiList;
      let {
        _id,
        name,
        email,
        number,
        country,
        state,
        subscription
      } = this.state;

      const body = {
        name,
        email,
        phone: number,
        country,
        state,
        id: _id,
        // subscription,
        ModifiedOn: Date.now()
      };
      console.log({ body });
      axios
        .post(updateUserDetailsApi, { ...body })
        .then(res => {
          if (res.status === 200) {
            setTimeout(() => {
              message.success({
                content: "User Details Updated",
                key,
                duration: 3
              });
            }, 1000);

            console.log({ res });
          } else {
            console.log({ res });
          }
        })
        .catch(err => {
          console.log({ err });
        });
    }
  }

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

                    <Col md="6" className="form-group">
                      <label htmlFor="fePhoneNumber">Phone Number</label>
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
                  <Row form>
                        <br/>
                
                  </Row>
                  <Button
                    theme="accent"
                    disabled={!this.state.enable}
                    onClick={this.submitForm.bind(this)}
                  >
                    Update Account
                  </Button>
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


//Redux Stuff



export default connect(null, { setUserToUpdate })(
  UserAccountDetails
);