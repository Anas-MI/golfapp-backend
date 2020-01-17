import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import apiList from "../services/apis/apiList";
import axios from "axios";
import {Link} from 'react-router-dom'
import { Tag, message } from "antd";
import { List, Avatar } from 'antd';
message.config({
  top: 80
});

export default class ViewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  componentDidMount() {
    const { viewOrder } = apiList;
    const viewOrderRoute = viewOrder + this.props.match.params.id;
    axios
      .get(viewOrderRoute)
      .then(res => {
      
        var data = Object.assign({}, res.data.data);
      
        if (res.status === 200) {
          console.log({res})
          this.setState({synergyId: data._id})
          this.setState({week: data.createdOn})
          if(res.data.data.user){
            console.log({"SSSS": res.data.data})
              this.setState({email: res.data.data.user.email})
          }
          delete data["_id"]
          delete data["__v"]
          delete data["createdOn"]
          delete data["user"]
          // delete data["createdOn"]
         const finalData = Object.keys(data).map((key,value) => {
      
            // if(key === "createdOn"){
            //   this.setState({week: res.data.data[key]})
            // }
            
            // if(key === "day"){
            //   this.setState({day: res.data.data[key].toUpperCase()})
            // }

            let title;
            switch(key){
              case "addressLine1":
                
              title="Address Line 1";
              break;
              case "addressLine2":
                title="Address Line 2";
                break;
                case "country":
                  title="Country";
                  break;
                  case "state":
                    title="State";
                break;
                case "city":
                  title="City";
                  break;
                  case "pincode":
                    title="Pin Code";
                break;
                case "paid":
                  title="Payment Status";
                  break;
                  case "week":
                    title="Week";
                    break;
                    case "day":
                      title="Day";
                break;
                case "payId":
                  title="Payment Id";
                  break;
                default: break;
                // title="THIS SHOULD NOT GO"
                
            }

            let description = data[key]
            if(key ==="paid"){
              if(description){
                description = "Completed"
              }  else if(!description) {
                description = "Pending"
              }
            }

            return{
              title,
              description
            }
            
        })
       
          this.setState({synergistic: finalData})
       
         }})
        }
   
  

  render() {


    return (
  
    <Container fluid className="main-content-container px-4">
         <Row noGutters className="page-header py-4">
           <PageTitle
            title="View Order"
            subtitle="Fit For Golf"
            md="6"
            className="ml-sm-auto mr-sm-auto"
          />
      
          <Col style={{    "textAlign": "right",
    "marginTop": "34px",
    "paddingRight": "214px"}} md="6"> 

  {/* <Tag color="geekblue">{this.state.day}</Tag> */}
    <Tag color="magenta">Ordered On {this.state.week}</Tag>
    <Tag color="magenta">User: {this.state.email}</Tag>

    {/* <Link style={{"marginLeft": "59px"}}to={`/edit/synergy/${this.state.synergyId}`}>Edit</Link> */}

          </Col>

        </Row>
        <Row>
          <Col lg="12">



          <List
    itemLayout="horizontal"
    dataSource={this.state.synergistic}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={window.location.origin + '/star.png' }/>}
          title={item.title}
          description={item.description}
        />
        
      </List.Item>
      
    )}
  />
  </Col>
  
  </Row>
  </Container>
    );
  }
}
