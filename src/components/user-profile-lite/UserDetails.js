import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import  apiList from "../../services/apis/apiList"
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress
} from "shards-react";
import { Popconfirm, message} from 'antd';
const {deleteUserApi} = apiList;
class UserDetails extends Component{
  


  confirm() {

    const deleteUserUrl = deleteUserApi + this.props.auth.userToUpdate._id;
    console.log({deleteUserUrl})
    axios.delete(deleteUserUrl).then(res => {
      console.log({res})
      if(res.status === 200){
      message.info('User Deleted');
        setTimeout(() => {
          // history.push("/users");
          
        }, 1000);}
    }).catch(err => {
      console.log({err})
    })

  }


  
  render(){
    console.log({"FROM USER DETAILS":this.props.auth.userToUpdate})
    
    const text = 'Are you sure you want to delete this User?';
    

    return(<Card small className="mb-4 pt-3">
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
      
      <Popconfirm placement="right" title={text} onConfirm={this.confirm.bind(this)} okText="Yes" cancelText="No">
        
      <Button pill outline theme="danger" size="md"  className="mb-2 ">
        <i className="material-icons ">delete</i>Delete 
      </Button>
      </Popconfirm>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="px-4">
        <div className="progress-wrapper">
          <strong className="text-muted d-block mb-2">
            {this.props.userDetails.performanceReportTitle}
          </strong>
          <Progress
            className="progress-sm"
            value={this.props.userDetails.performanceReportValue}
          >
            <span className="progress-value">
              {this.props.userDetails.performanceReportValue}%
            </span>
          </Progress>
        </div>
      </ListGroupItem>
      <ListGroupItem className="p-4">
        <strong className="text-muted d-block mb-2">
          {this.props.userDetails.metaTitle}
        </strong>
        <span>{this.props.userDetails.metaValue}</span>
      </ListGroupItem>
    </ListGroup>
  </Card>)
  }}

  
;

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


export default connect(mapStateToProps)(
  UserDetails
);




