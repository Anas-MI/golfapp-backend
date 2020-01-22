import React, { Component } from "react";
import apiList from "../services/apis/apiList";
import axios from "axios";
import { message, Input, Select, Popconfirm } from "antd";
import projectSettings from "../constants/projectSettings";
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
const { baseUrl } = projectSettings;
const { TextArea } = Input;
const { Option } = Select;
message.config({
  top: 80
});

export default class SynergyEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      previewVisible: false,

      entries: [],
      previewImage: "",
      fileData: {},
      fileList: props.fileList || [],
      files: [],
      previewModal: false,
      previewUrl: ""
    };
  }

  handleCancel = () => this.setState({ previewModal: false });

  handlePreview = async file => {
    

    if (file.name) {
      this.setState({
        previewImage: file.thumbUrl,
        previewModal: true
      });
    } else if (file.url) {
      this.setState({
        previewImage: file.url,
        previewModal: true
      });
    }
  };

  handleChangeImage = ({ fileList }) => {
 
    this.setState({ fileList });
  };

  componentDidMount() {
    const { synergyCommonApi } = apiList;
    const getSynergyPost = synergyCommonApi + this.props.slug;
    axios
      .get(getSynergyPost)
      .then(res => {
        if (res.status === 200) {
          this.setState({ ...res.data.data });
          if (res.data.data.entries.length >= 1) {
            let list = res.data.data.entries.map((el, index) => {
              return {
                uid: -Math.abs(index + 1),
                status: "done",
                url: baseUrl + el.substring(6),
                orig: el
              };
            });
            this.setState({ fileList: list });
          }
        }
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
      message.loading({ content: "Updating Post...", key });
    };
    openMessage();
    const { synergyUpdateApi } = apiList;
    const synergyUpdateUrl = synergyUpdateApi + this.state._id;

    const formData = new FormData();
    this.state.fileList.forEach(file => {
      formData.append("synergy", file);
    });
    let {
      _id,
      name,
      goal,
      explanation,
      nutritionTip,
      thoughts,
      thoughtsBy,
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
      thoughtsBy,
      thinkGolf,
      makeMeSmile,
      week,
      day
    };

    let bodyForm = JSON.stringify(body);
    formData.append("body", bodyForm);

    axios
      .post(synergyUpdateUrl, formData)
      .then(res => {
        if (res.status === 200) {
          setTimeout(() => {
            message.success({
              content: "Post Updated",
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
    const { synergyCommonApi } = apiList;
    const deletePostUrl = synergyCommonApi + "/delete/" + this.state._id;

    axios
      .delete(deletePostUrl)
      .then(res => {
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
    //upload functionality
 
    const { multiple = true, showUploadList = true } = this.props;
console.log(this.state)
    const props = {
      onRemove: file => {
        const index = this.state.fileList.indexOf(file);
        const newFileList = this.state.fileList.slice();
        newFileList.splice(index, 1);
        this.props.onChange && this.props.onChange(newFileList);
        this.setState({
          fileList: newFileList,
          files: newFileList
        });
      },
      beforeUpload: file => {
        let count = [];
        let files = [];
        if (showUploadList) {
          files = this.state.fileList;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
     
        reader.onload = e => {
          file.thumbUrl = e.target.result;
        
          files.push(file);
          files.map((item, index) => {
            if (file.name === item.name) {
              count.push(index);
              if (count.length > 1) {
                message.error("This File Aready Exists");
                files.splice(index, 1);
                return;
              }
            }
          });
          this.setState({
            fileList: [...files]
          });

          this.props.onChange && this.props.onChange(this.state.fileList);
        };
        return false;
      },
      onPreview: this.handlePreview,
      fileList: showUploadList ? this.state.fileList : null,
      listType: "picture-card",
      multiple: multiple,
      showUploadList: showUploadList,
      onRemove: fileId => {
      
        if (fileId.url) {
          let url =
            baseUrl +
            "/api/v1/synergistic/delete/image/" +
            this.state._id;
          let body = {
            toDelete: fileId.orig
          };
          axios
            .post(url, body)
            .then(data => {
              console.log("Image Deleted!");
            })
            .catch(err => {
              console.log({
                "Error Deleting Image": err
              });
            });
        }
        const { fileList } = this.state;
        this.setState({
          fileList: fileList.filter(item => item.uid !== fileId.uid)
        });
      }
    };

    const { title } = this.props;


    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const text = "Are you sure you want to delete this Post?";

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

                      <TextArea
                        placeholder="Name..  "
                        onChange={this.handleChange.bind(this, "name")}
                        value={this.state.name}
                        required={true}
                        autoSize
                      />
                    </Col>
                    <Col md="1"></Col>
                    <Col md="3" className="form-group">
                      <label htmlFor="feName">Week</label>
                      <FormInput
                        id="feweek"
                        placeholder="Week"
                        onChange={this.handleChange.bind(this, "week")}
                        value={this.state.week}
                      />
                    </Col>
                    <Col md="1"></Col>

                    <Col md="3" className="form-group">
                      <label htmlFor="feName">Day</label>

                      <Select
                        value={this.state.day}
                        onChange={this.handleSelect}
                      >
                        <Option value="monday">Monday</Option>
                        <Option value="tuesday">Tuesday</Option>
                        <Option value="wednesday">Wednesday</Option>
                        <Option value="thursday">Thursday</Option>
                        <Option value="friday">Friday</Option>
                      </Select>
                    </Col>

                    <Col md="8" className="form-group">
                      <label htmlFor="fePhoneNumber">Goal</label>
                      <TextArea
                        placeholder="Goal...."
                        onChange={this.handleChange.bind(this, "goal")}
                        value={this.state.goal}
                        autoSize
                      />
                    </Col>
                    <Col md="8" className="form-group">
                      <label htmlFor="fePhoneNumber">Explanation</label>
                      <TextArea
                        placeholder="Explanation...."
                        onChange={this.handleChange.bind(this, "explanation")}
                        value={this.state.explanation}
                        autoSize
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="8" className="form-group">
                      <label htmlFor="feEmail">Nutrition Tip</label>
                      <TextArea
                        placeholder="Nutrition Tip..  "
                        onChange={this.handleChange.bind(this, "nutritionTip")}
                        value={this.state.nutritionTip}
                        autoSize
                      />
                    </Col>
                    <Col md="2"></Col>
                  </Row>
                  <Row form>
                    <Col md="8" className="form-group">
                      <label htmlFor="feEmail">Thoughts</label>
                      <TextArea
                        placeholder="Thoughts..  "
                        onChange={this.handleChange.bind(this, "thoughts")}
                        value={this.state.thoughts}
                        autoSize
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="8" className="form-group">
                      <label htmlFor="feEmail">Thoughts By</label>
                      <TextArea
                        placeholder="Thoughts By..  "
                        onChange={this.handleChange.bind(this, "thoughtsBy")}
                        value={this.state.thoughtsBy}
                        autoSize
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="8" className="form-group">
                      <label htmlFor="feEmail">Think golf</label>
                      <TextArea
                        placeholder="Think golf..  "
                        value={this.state.thinkGolf}
                        onChange={this.handleChange.bind(this, "thinkGolf")}
                        autoSize
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="8" className="form-group">
                      <label htmlFor="feEmail">Make me smile</label>
                      <TextArea
                        placeholder="Make me smile..  "
                        onChange={this.handleChange.bind(this, "makeMeSmile")}
                        value={this.state.makeMeSmile}
                        autoSize
                      />
                    </Col>
                  </Row>
                  <Row form>
                    {" "}
                    <div>
                      <Upload {...props}>
                        {!showUploadList && this.state.fileList.length >= 1 ? (
                          <img
                            src={this.state.fileList[0].thumbUrl}
                            className=""
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
                      <Modal
                        visible={this.state.previewModal}
                        footer={null}
                        onCancel={this.handleCancel}
                      >
                        <img
                          style={{ width: "100%" }}
                          src={this.state.previewImage}
                        />
                      </Modal>
                    </div>
                  </Row>
                  <Row form></Row>
                  <Button theme="accent" onClick={this.submitForm.bind(this)}>
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
                      style={{ marginLeft: "10px" }}
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
