import React, { PureComponent, Component } from "react";
import { Upload, Modal, Icon, message } from "antd";
import apiList from "../services/apis/apiList";
import axios from "axios";
import { Input, Select } from "antd";
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

const { TextArea } = Input;
const { Option } = Select;
message.config({
  top: 80
});

export default class SynergyCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      day: "monday",
      previewVisible: false,
      previewImage: "",
      fileData: {},
      fileList: props.fileList || [],
      files: [],
      previewModal: false,
      previewUrl: ""
    };
  }

  handlePreview = file => {
    this.setState({
      previewModal: true,
      previewUrl: file.thumbUrl
    });
  };
  handleCloseModal = () => {
    this.setState({
      previewModal: false
    });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handleChangeImage = ({ fileList }) => {
    console.log({ fileList });
    this.setState({ fileList });
  };

  componentDidMount() {}

  handleChange(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  handleSelect = value => {
    this.setState({ day: value });
  };

  submitForm(e) {
    e.preventDefault();
    const key = "updatingDetails";
    const openMessage = () => {
      message.loading({ content: "Creating Post...", key });
    };
    openMessage();
    const { synergyCreateApi } = apiList;
    const formData = new FormData();
    this.state.fileList.forEach(file => {
      formData.append("synergy", file);
    });
    console.log({ submit: this.state.fileList });
    console.log({ formData });
    let {
      name,
      goal,
      explanation,
      nutritionTip,
      thoughts,
      thinkGolf,
      makeMeSmile,
      week,
      day,
      thoughtsBy
    } = this.state;

    const body = {
      name,
      goal,
      explanation,
      nutritionTip,
      thoughts,
      thinkGolf,
      makeMeSmile,
      week,
      day,
      thoughtsBy
    };

    let bodyForm = JSON.stringify(body);
    formData.append("body", bodyForm);

    axios
      .post(synergyCreateApi, formData)
      .then(res => {
        if (res.status === 200) {
          setTimeout(() => {
            message.success({
              content: "Post Created",
              key,
              duration: 3
            });
          }, 1000);
          setTimeout(() => {
            window.location.href = "/synergistic";
          }, 2000);
        } else {
          console.log({ res });
        }
      })
      .catch(err => {
        console.log({ err });
      });
  }

  render() {
    //Upload functionality
    const { multiple = true, showUploadList = true } = this.props;

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
          files = this.state.files;
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
      showUploadList: showUploadList
    };

    const { title } = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
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
                        type="number"
                        max="2"
                        onChange={this.handleChange.bind(this, "week")}
                        value={this.state.week}
                      />
                    </Col>
                    <Col md="1"></Col>

                    <Col md="3" className="form-group">
                      <label htmlFor="feName">Day</label>

                      <Select
                        defaultValue="monday"
                        onChange={this.handleSelect}
                      >
                        <Option value="monday">Monday</Option>
                        <Option value="tuesday">Tuesday</Option>
                        <Option value="wednesday">Wednesday</Option>
                        <Option value="thursday">Thursday</Option>
                        <Option value="friday">Friday</Option>
                      </Select>
                    </Col>
                    {/* <ManualUpload></ManualUpload> */}
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
                    <Col md="2">
                      <div className="clearfix"></div>
                    </Col>
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
                        onCancel={this.handleCloseModal}
                      >
                        <img
                          style={{ width: "100%" }}
                          src={this.state.previewUrl}
                        />
                      </Modal>
                    </div>
                  </Row>
                  <Button theme="accent" onClick={this.submitForm.bind(this)}>
                    Create Post
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
