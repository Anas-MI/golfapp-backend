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





export default class WorkoutEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {}
    };
  }

  componentDidMount() {

   
      function convertTime(serverdate) {
        var date = new Date(serverdate);
        // convert to utc time
        var toutc = date.toUTCString();
        //convert to local time
        var locdat = new Date(toutc + " UTC");
        return locdat;
      }
  

    const { commonWorkOut } = apiList;
    const getWorkout = commonWorkOut + this.props.slug;
    axios
      .get(getWorkout)
      .then(res => {
        if (res.status === 200) {
          this.setState({ ...res.data.data, updatedAt:convertTime(res.data.data.updatedAt).toString() });
        }
        console.log(this.state)
      })
      .catch(err => {
        console.log({ "Something went wrong": err });
      });
  }

  handleChange(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  handleSelect = value => {
    this.setState({ day: value });
  };

  deletePost() {}

  submitForm(e) {
    e.preventDefault();
    const key = "updatingDetails";
    const openMessage = () => {
      message.loading({ content: "Updating Workout...", key });
    };
    openMessage();
    const { updateWorkOut } = apiList;
    const updateWorkOutUrl = updateWorkOut + this.state._id;
    console.log(updateWorkOutUrl);
    let {
        isEnabled, 
        _id, 
        url, 
        title, 
        description, 
        isPaid, 
        thumbnail,  
        position
    } = this.state;

    const body = {
        isEnabled, 
        _id, 
        url, 
        title, 
        description, 
        isPaid, 
        thumbnail,  
        position
    };

    axios
      .post(updateWorkOutUrl, { ...body, updatedAt: Date.now() })
      .then(res => {
        if (res.status === 200) {
          setTimeout(() => {
            message.success({
              content: "Workout Updated",
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
    const { commonWorkOut } = apiList;
    const commonWorkOutUrl = commonWorkOut + "delete/" + this.state._id;

    axios
      .delete(commonWorkOutUrl)
      .then(res => {
        if (res.status === 200) {
          message.info("Workout Deleted");
          setTimeout(() => {
            window.location.href = "/workout";
          }, 1000);
        }
      })
      .catch(err => {
        console.log({ err });
      });
  }

  onChange = (checked,value) => {
    console.log(`switch to ${checked}`);
    console.log(value);
    this.setState({isPaid: checked})
  }

  render() {
    const { title } = this.props;

    const text = "Are you sure you want to delete this Workout?";

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
                    <Col md="4" className="form-group">
                      <label htmlFor="feName">URL</label>

                      <TextArea
                        placeholder="Name..  "
                        onChange={this.handleChange.bind(this, "url")}
                        value={this.state.url}
                        required={true}
                        autoSize
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
               
               
                

                  <Row form>
                    <Col md="4">
                    <label htmlFor="feEmail">Last Updated At: </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  

                    <Tag color="green">{this.state.updatedAt}</Tag>
                    </Col>
                  
                  </Row>
                  <br/>
                  <Button theme="accent" onClick={this.submitForm.bind(this)}>
                    Update Workout
                  </Button>
                  <Popconfirm
                    placement="right"
                    title={text}
                    onConfirm={this.confirm.bind(this)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      style={{ marginLeft: "10px" }}
                      theme="danger"
                      onClick={this.deletePost.bind(this)}
                    >
                      <i className="material-icons ">delete</i>Delete Workout
                    </Button>
                  </Popconfirm>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  }
}
