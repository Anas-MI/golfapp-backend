import React, {Component} from "react";
import PropTypes from "prop-types";
import apiList from "../../services/apis/apiList";
import axios from "axios";

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
  Button
} from "shards-react";

export default class UserAccountDetails extends Component{
  
    constructor(props){
      super(props)
      this.state = {
        userData: {},
        fields: {},
        errors: {}
      }
      
    }


    componentDidMount(){
      const { updateUserDetailsApi, getUserDetailsApi } = apiList;
      const getUserDetailsRoute =
        getUserDetailsApi + `${this.props.slug}`;
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

  handleValidation(){
   let fields = this.state.fields;
   let errors = {};
   let formIsValid = true;
  
   //Name
   if(!fields["name"]){
      formIsValid = false;
      errors["name"] = "Cannot be empty";
   }
  
   if(typeof fields["name"] !== "undefined"){
      if(!fields["name"].match(/^[a-zA-Z]+$/)){
         formIsValid = false;
         errors["name"] = "Only letters";
      }        
   }
  
   //Email
   if(!fields["email"]){
      formIsValid = false;
      errors["email"] = "Cannot be empty";
   }
  
   if(typeof fields["email"] !== "undefined"){
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');
  
      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
         formIsValid = false;
         errors["email"] = "Email is not valid";
       }
  }  
  
  this.setState({errors: errors});
  return formIsValid;
  }





contactSubmit(e){
e.preventDefault();

if(this.handleValidation()){
  alert("Form submitted");
}else{
  alert("Form has errors.")
}

}

handleChange(name, e){         
// let fields = this.state.fields;
// fields[field] = e.target.value;        
// this.setState({fields});
var change = {};
change[name] = e.target.value;
this.setState(change);


}

  render(){
    const { title, user} = this.props;

console.log(this.state)

    return(

      
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
                    onChange={this.handleChange.bind(this, "name")} value={this.state.name}
                    />
                </Col>
                {/* Last Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feLastName">Phone Number</label>
                  <FormInput
                    id="fePhoneNumber"
                    placeholder="Phone Number"
                    value={user.phone}
                    type="number"
                    onChange={this.handleChange.bind(this, "number")} value={this.state.number}
                    />
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
                    value={this.state.email}
                    onChange={this.handleChange.bind(this, "email")} 
                    autoComplete="email"
                  />
                </Col>
                {/* Password */}
                {/* <Col md="6" className="form-group">
                  <label htmlFor="fePassword">Password</label>
                  <FormInput
                  type="password"
                    id="fePassword"
                    placeholder="Password"
                    value=""
                    onChange={() => {}}
                    autoComplete="current-password"
                    />
                  </Col> */}
              </Row>
              <FormGroup>
                <label htmlFor="feAddress">Address</label>
                <FormInput
                  id="feAddress"
                  placeholder="Address"
                  value="1234 Main St."
                  onChange={this.handleChange.bind(this, "address")} 
                  />
              </FormGroup>
              <Row form>
                {/* City */}
                <Col md="6" className="form-group">
                  <label htmlFor="feCity">Country</label>
                  <FormInput
                    id="feCity"
                    placeholder="Country"
                    value={this.state.country}
                    onChange={this.handleChange.bind(this, "country")} 
                    />
                </Col>
                {/* State */}
                <Col md="4" className="form-group">
                  <label htmlFor="feInputState">State</label>
                  <FormInput
                    id="feCity"
                    placeholder="state"
                    value={this.state.state}
                    onChange={this.handleChange.bind(this, "state")} 

                    />
                </Col>
                {/* Zip Code */}
                <Col md="2" className="form-group">
                  <label htmlFor="feZipCode">Zip</label>
                  <FormInput
                    id="feZipCode"
                    placeholder="Zip"
                    onChange={this.handleChange.bind(this, "zip")} 
                    
                  />
                </Col>
              </Row>
              <Row form>
                {/* Description */}
                <Col md="12" className="form-group">
                  <label htmlFor="feDescription">Description</label>
                  <FormTextarea id="feDescription" rows="5" />
                </Col>
              </Row>
              <Button theme="accent">Update Account</Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
)
}
};

UserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UserAccountDetails.defaultProps = {
  title: "Account Details"
};


