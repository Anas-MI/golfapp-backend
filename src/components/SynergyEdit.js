import React, { Component } from "react";
import PropTypes from "prop-types";
import apiList from "../services/apis/apiList";
import axios from "axios";
import { connect } from "react-redux";
import { Tag, message, Input, Select, Popconfirm } from "antd";

import { Upload, Icon } from "antd";
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
import { Modal } from "antd";

const { TextArea } = Input;
const { Option } = Select;
message.config({
  top: 80
});

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    fileList: []
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default class SynergyEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      
    };
  }

  componentDidMount() {
    const { synergyCommonApi } = apiList;
    const getSynergyPost = synergyCommonApi + this.props.slug;
    axios
      .get(getSynergyPost)
      .then(res => {
        if (res.status === 200) {
          this.setState({ ...res.data.data });
        }
        console.log(this.state)

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
    console.log(this.state);
    //Validations

    //Checking for name

    // if (name === "name") {
    //   //Returns nameError true or false depending upon the input

    //   this.setState(validateName(e.target.value));
    // }

    // //Checking for email

    // if (name === "email") {
    //   //Returns emailError true or false depending upon the input

    //   this.setState(validateEmail(e.target.value));
    // }

    // //Checking for phone number
    // if (name === "number") {
    //   if (name.length > 0) {
    //     this.setState({ validateNumber: true });
    //     this.setState(validateNumber(e.target.value));
    //   } else {
    //     this.setState({ validateNumber: false });
    //   }
    // }

    // //Enable/disable form submit button
    // let { nameError, emailError, numberError } = this.state;
    // if (!nameError && !emailError && !numberError) {
    //   this.setState({ enable: true });
    // } else {
    //   this.setState({ enable: false });
    // }
  }

  handleSelect = (value) => {
    this.setState({day: value})
  }

  deletePost(){

  }

  submitForm(e) {
    e.preventDefault();
      const key = "updatingDetails";
      const openMessage = () => {
        message.loading({ content: "Updating Post...", key });
      };
      openMessage();
      const { synergyUpdateApi } = apiList;
      const synergyUpdateUrl = synergyUpdateApi + this.state._id
      console.log(synergyUpdateUrl)
      let {
        _id,
        name,
        goal,
        explanation, 
        nutritionTip, 
        thoughts, 
        thinkGolf, 
        makeMeSmile, 
        week,
        day
      } = this.state;

      const body = {
        _id,
        name,
        goal,
        explanation, 
        nutritionTip, 
        thoughts, 
        thinkGolf, 
        makeMeSmile, 
        week,
        day

      };
      console.log({ body });
      axios
        .post(synergyUpdateUrl, { ...body })
        .then(res => {
          if (res.status === 200) {
            setTimeout(() => {
              message.success({
                content: "Post Updated",
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

  confirm() {
    const { synergyCommonApi } = apiList;
    const deletePostUrl =  synergyCommonApi + this.state._id
    console.log({ deletePostUrl });
    axios
      .delete(deletePostUrl)
      .then(res => {
        console.log({ res });
        if (res.status === 200) {
          message.info("Post Deleted");
          setTimeout(() => {
            window.location.href = "/synergistic";
          }, 1000);
        }
      })
      .catch(err => {
        console.log({ err });
      });
    }


  render() {
    const { title, user } = this.props;

    console.log(this.state);
    const text = "Are you sure you want to delete this Post?";
    console.log(this.state.day)
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
                      <label htmlFor="feName">Name</label>
                      {/* <FormInput
                        id="feName"
                        placeholder="Name"
                        // valid={!this.state.nameError}
                        // invalid={this.state.nameError}
                        onChange={this.handleChange.bind(this, "name")}
                        value={this.state.name}
                      /> */}
                      <TextArea placeholder="Name..  " 
                        onChange={this.handleChange.bind(this, "name")}
                        value={this.state.name}
                        required={true}
                      autoSize />
                      {/* <FormFeedback valid>Name looks good!</FormFeedback>
                      <FormFeedback>
                        Oops, {this.state.nameErrorMsg}
                      </FormFeedback> */}
                    </Col>
                    <Col md="1"></Col>
                    <Col md="3" className="form-group">
                      <label htmlFor="feName">Week</label>
                      <FormInput
                        id="feweek"
                        placeholder="Week"
                        // valid={!this.state.nameError}
                        // invalid={this.state.nameError}
                        onChange={this.handleChange.bind(this, "week")}
                        value={this.state.week}
                      />
   
                      {/* <FormFeedback valid>Name looks good!</FormFeedback>
                      <FormFeedback>
                        Oops, {this.state.nameErrorMsg}
                      </FormFeedback> */}
                    </Col>
                    <Col md="1"></Col>

                    <Col md="3" className="form-group">
                      <label htmlFor="feName">Day</label>
                      
                                           <Select value={this.state.day}  onChange={this.handleSelect}>
      <Option value="monday">Monday</Option>
      <Option value="tuesday">Tuesday</Option>
      <Option value="wednesday">Wednesday</Option>
      <Option value="thursday">Thursday</Option>
      <Option value="friday">Friday</Option>

    </Select>
                      {/* <FormFeedback valid>Name looks good!</FormFeedback>
                      <FormFeedback>
                        Oops, {this.state.nameErrorMsg}
                      </FormFeedback> */}
                    </Col>

                    <Col md="8" className="form-group">
                      <label htmlFor="fePhoneNumber">Goal</label>
                      <TextArea placeholder="Goal...." 
                        onChange={this.handleChange.bind(this, "goal")}
                        value={this.state.goal}
                      
                      autoSize />

                      {/* <FormInput
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
                      /> */}
                      {/* <FormFeedback valid>Number looks good!</FormFeedback>
                      <FormFeedback>
                        Oops, {this.state.numberErrorMsg}
                      </FormFeedback> */}
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="8" className="form-group">
                      <label htmlFor="feEmail">Nutrition Tip</label>
                      <TextArea placeholder="Nutrition Tip..  " 
                        onChange={this.handleChange.bind(this, "nutritionTip")}
                        value={this.state.nutritionTip}
                      
                      autoSize />
                      {/* <FormInput
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
                      </FormFeedback> */}
                    </Col>
                    <Col md="2"></Col>
                    <Col md="2">
                      <PicturesWall></PicturesWall>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="8" className="form-group">
                      <label htmlFor="feEmail">Thoughts</label>
                      <TextArea placeholder="Thoughts..  "
                        onChange={this.handleChange.bind(this, "thoughts")}
                        value={this.state.thoughts}
                      
                      autoSize />
                      {/* <FormInput
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
                      </FormFeedback> */}
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="8" className="form-group">
                      <label htmlFor="feEmail">Think golf</label>
                      <TextArea placeholder="Think golf..  "
                        value={this.state.thinkGolf}

                        onChange={this.handleChange.bind(this, "thinkGolf")}
                      
                      autoSize />
                      {/* <FormInput
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
                      </FormFeedback> */}
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="8" className="form-group">
                      <label htmlFor="feEmail">Make me smile</label>
                      <TextArea placeholder="Make me smile..  " 
                        onChange={this.handleChange.bind(this, "makeMeSmile")}
                        value={this.state.makeMeSmile}
                      
                      autoSize />
                      {/* <FormInput
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
                      </FormFeedback> */}
                    </Col>
                  </Row>

                  <Row form></Row>
                  <Button
                    theme="accent"
                  
                    onClick={this.submitForm.bind(this)}
                  >
                    Update Post
                  </Button>
                  <Popconfirm
            placement="right"
            title={text}
            onConfirm={this.confirm.bind(this)}
            okText="Yes"
            cancelText="No"
          >
            
                  <Button 
                    style={{"marginLeft": "10px"}}
                    theme="danger"
                  
                    onClick={this.deletePost.bind(this)}
                  >
                    <i className="material-icons ">delete</i>Delete Post
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
