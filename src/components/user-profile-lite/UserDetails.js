import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { Upload, Icon } from 'antd';
import {Button as AntdButton} from "antd"; 
import apiList from "../../services/apis/apiList";
import projectSettings from "../../constants/projectSettings";

import { Popconfirm, message } from "antd";
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress
} from "shards-react";
const { baseUrl } = projectSettings;
const { deleteUserApi } = apiList;
class UserDetails extends Component {

  constructor(props){
    super(props);
    this.state = {
      fileList: props.fileList || [],
      files: [],
      media:[]


    }
  }

  componentWillReceiveProps(nextProps){
    console.log({nextProps})
    const { getUserDetailsApi } = apiList;
    let userId = nextProps.auth.userToUpdate._id;
    this.setState({_id: userId})
    console.log(userId)
    
    if(nextProps.auth.userToUpdate._id){
    const getUserDetailsRoute = getUserDetailsApi + `${nextProps.auth.userToUpdate._id}`;
    axios
      .get(getUserDetailsRoute)
      .then(res => {
        console.log(
          {res}
        )
        
        if (res.status === 200) {
          console.log(res.data)
          if (res.data.media.length >= 1) {
            let list = res.data.media.map((el, index) => {
              return {
                uid: -Math.abs(index + 1),
                status: "done",
                url: baseUrl + el.substring(6),
                name: el.substring(22),
                orig: el
              };
            });
            this.setState({ fileList: list });
            this.setState({ files: list  });
          }
          // this.props.setUserToUpdate({name: this.state.name, _id: this.state.id})
        }
      })
      .catch(err => {
        console.log({ "Something went wrong": err });
      });
    // axios.post(updateUserDetailsApi, userData).then().catch()
  }
  }

  
  
  handleUpload = () => {

    // e.preventDefault();
    const key = "updatingDetails";
    const openMessage = () => {
      message.loading({ content: "Uploading Files...", key });
    };
    openMessage();
    const { updateUserDetailsApi } = apiList;
    const updateUserDetailsApiUrl = updateUserDetailsApi + "/media/" + this.state._id;


    const formData = new FormData();
    this.state.fileList.forEach(file => {
      formData.append("media", file);
    });
    axios
      .post(updateUserDetailsApiUrl, formData)
      .then(res => {
        if (res.status === 200) {
          setTimeout(() => {
            message.success({
              content: "Uploaded!",
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
    const deleteUserUrl = deleteUserApi + this.props.auth.userToUpdate._id;
    console.log({ deleteUserUrl });
    axios
      .delete(deleteUserUrl)
      .then(res => {
        console.log({ res });
        if (res.status === 200) {
          message.info("User Deleted");
          setTimeout(() => {
            window.location.href = "/users";
          }, 1000);
        }
      })
      .catch(err => {
        console.log({ err });
      });
    }
    
    render() {
      console.log(this.props) 
      console.log(this.state)
      //Props for upload functionality
    // const props = {
    //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //   onChange({ file, fileList }) {
    //     if (file.status !== 'uploading') {
    //       console.log(file, fileList);
    //     }
    //   },
    //   defaultFileList: [
    //     {
    //       uid: '1',
    //       name: 'xxx.png',
    //       status: 'done',
    //       response: 'Server Error 500', // custom error message to show
    //       url: 'http://www.baidu.com/xxx.png',
    //     },
    //     {
    //       uid: '2',
    //       name: 'yyy.png',
    //       status: 'done',
    //       url: 'http://www.baidu.com/yyy.png',
    //     },
    //     {
    //       uid: '3',
    //       name: 'zzz.png',
    //       status: 'error',
    //       response: 'Server Error 500', // custom error message to show
    //       url: 'http://www.baidu.com/zzz.png',
    //     },
    //   ],
    // };

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
      onSuccess: (resp, file, xhr) => {
        file.status = 'done';},
      onPreview: this.handlePreview,
      fileList: showUploadList ? this.state.fileList : null,
      multiple: multiple,
      showUploadList: showUploadList,
      onRemove: fileId => {
      
        if (fileId.url) {
          let url =
            baseUrl +
            "/api/v1/users/update/delete/" +
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

     
    console.log({ "FROM USER DETAILS": this.props.auth.userToUpdate });

    const text = "Are you sure you want to delete this User?";

    return (
      <Card small className="mb-4 pt-3">
        <CardHeader className="border-bottom text-center">
          <div className="mb-3 mx-auto">
            <img
              className="rounded-circle"
              src={this.props.userDetails.avatar}
              alt={this.props.userDetails.name}
              width="110"
            />
          </div>
          <h4 className="mb-0">{this.props.auth.userToUpdate.name}</h4>
          <span className="text-muted d-block mb-2">User</span>

          <Popconfirm
            placement="right"
            title={text}
            onConfirm={this.confirm.bind(this)}
            okText="Yes"
            cancelText="No"
          >
            <Button pill outline theme="danger" size="md" className="mb-2 ">
              <i className="material-icons ">delete</i>Delete
            </Button>
          </Popconfirm>
        </CardHeader>
        <ListGroup flush>
          {/* <ListGroupItem className="px-4">
            <div className="progress-wrapper"> */}
              {/* <strong className="text-muted d-block mb-2"> */}
                {/* {this.props.userDetails.performanceReportTitle} */}
              {/* </strong> */}
              {/* <Progress
                className="progress-sm"
                // value={this.props.userDetails.performanceReportValue}
              > */}
                {/* <span className="progress-value">
                  {this.props.userDetails.performanceReportValue}%
                </span>
              </Progress> */}
            {/* </div>
          </ListGroupItem> */}
          <ListGroupItem className="p-4">
           
          <Upload {...props}>
    <AntdButton>
      <Icon type="select" /> Select File
    </AntdButton>
    
  </Upload>
  <br/>
  <AntdButton  onClick={this.handleUpload}>
      <Icon type="upload"/>  Upload
    </AntdButton>
    
  
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  }
}

UserDetails.propTypes = {
  /**
   * The user details object.
   */
  userDetails: PropTypes.object
};

UserDetails.defaultProps = {
  userDetails: {
    name: "Sierra Brooks",
    avatar: require("./../../images/avatars/0.jpg"),
    jobTitle: "Project Manager",
    performanceReportTitle: "Workload",
    performanceReportValue: 74,
    metaTitle: "Description",
    metaValue:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
  }
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(UserDetails);


