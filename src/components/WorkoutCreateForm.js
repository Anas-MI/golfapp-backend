import React, { Component } from "react";
import apiList from "../services/apis/apiList";
import axios from "axios";
import { message, Input, Select, Popconfirm, Switch,Tag } from "antd";

import { Upload, Icon } from "antd";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  Button
} from "shards-react";
import { Modal } from "antd";

const { TextArea } = Input;
const { Option } = Select;
message.config({
  top: 80
});



export default class WorkoutCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      disabled: true,
      url:"", 
      title:"", 
      description:"", 
      isPaid:"", 
      thumbnail:"",  
      position:"" 
    };
  }



  handleChange(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);

    let {url, 
      title, 
      description, 
     
      thumbnail,  
      position}  = this.state
    let inputs = [ url, 
      title, 
      description, 
   
      thumbnail,  
      position ]
console.log(inputs)
inputs.map(input => {
 
  if (input.length < 2 ){
    console.log("trueeeee")
    this.setState({disabled: true})
  } else if(input.length >  2) {
    console.log("false")

    this.setState({disabled:false})
  }
})

  }




  handleSelect = value => {
    this.setState({ day: value });
  };

  deletePost() {}

  submitForm(e) {
    e.preventDefault();
    const key = "updatingDetails";
    const openMessage = () => {
      message.loading({ content: "Creating Workout...", key });
    };
    openMessage();
    const { createWorkout } = apiList;
  

    let { 
        url, 
        title, 
        description, 
        isPaid, 
        thumbnail,  
        position
    } = this.state;

    const body = {
      
        url, 
        title, 
        description, 
        isPaid, 
        thumbnail,  
        position
    };

    axios
      .post(createWorkout, { ...body })
      .then(res => {
        if (res.status === 200) {
          setTimeout(() => {
            message.success({
              content: "Workout Created",
              key,
              duration: 3
            });
          }, 1000);
        } else {
          console.log({ res });
        }
      })
      .catch(err => {
        console.log({ err });
      });
  }

  confirm() {
 
  }

  onChange = (checked,value) => {
    console.log(`switch to ${checked}`);
    console.log(value);
    this.setState({isPaid: checked})
  }

  render() {
    const { title } = this.props;



    return (
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Create a new workout</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form>
                  <Row form>
                    <Col md="4" className="form-group">
                      <label htmlFor="feName">URL</label>

                      <TextArea
                        placeholder="Enter the URL"
                        onChange={this.handleChange.bind(this, "url")}
                        value={this.state.url}
                        
                        autoSize
                        required="required"
                      />
                    </Col>
                    <Col md="1"></Col>
                    <Col md="3" className="form-group">
                      <label htmlFor="feName">Title</label>
                      <FormInput
                        id="fetitle"
                        placeholder="Title"
                        onChange={this.handleChange.bind(this, "title")}
                        value={this.state.title}
                      />
                    </Col>
                    <Col md="1"></Col>

                    <Col md="3" className="form-group">
                    <label htmlFor="fePhoneNumber">Position</label>
                      <TextArea
                        placeholder="Position...."
                        onChange={this.handleChange.bind(this, "position")}
                        value={this.state.position}
                        autoSize
                      />
                    </Col>

                    <Col md="8" className="form-group">
                      <label htmlFor="fePhoneNumber">Description</label>
                      <TextArea
                        placeholder="Description...."
                        onChange={this.handleChange.bind(this, "description")}
                        value={this.state.description}
                        autoSize
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="8" className="form-group">
                      <label htmlFor="feEmail">Thumbnail</label>
                      <TextArea
                        placeholder="Thumbnail..  "
                        onChange={this.handleChange.bind(this, "thumbnail")}
                        value={this.state.thumbnail}
                        autoSize
                      />
                    </Col>
                    <Col md="2"></Col>
                    <Col md="2">
                    <label htmlFor="feEmail">Is Paid - </label>

                    <Switch checked={this.state.isPaid} onClick={this.onChange.bind(this)} checkedChildren="Yes" unCheckedChildren="No" />
                    </Col>
                    
                  </Row>
               
               
                

                
                  <br/>
                  <Button theme="accent" disabled={this.state.disabled} onClick={this.submitForm.bind(this)}>
                    Create Workout
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
