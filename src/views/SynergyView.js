import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import apiList from "../services/apis/apiList";
import axios from "axios";
import { Tag, message } from "antd";
import { List, Avatar } from 'antd';
message.config({
  top: 80
});

export default class SynergyPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  componentDidMount() {
    const { synergyCommonApi } = apiList;
    const getSynergyRoute = synergyCommonApi + this.props.match.params.id;
    axios
      .get(getSynergyRoute)
      .then(res => {
        if (res.status === 200) {
          let data = res.data.data;
          delete data["_id"]
          delete data["__v"]
         const finalData = Object.keys(data).map((key,value) => {

            if(key === "week"){
              this.setState({week: res.data.data[key]})
            }
            
            if(key === "day"){
              this.setState({day: res.data.data[key].toUpperCase()})
            }

            let title;
            switch(key){
              case "name":
                
              title="Name";
              break;
              case "goal":
                title="Goal";
                break;
                case "explanation":
                  title="Explanation";
                  break;
                  case "nutritionTip":
                    title="Nutrition Tip";
                break;
                case "thoughts":
                  title="Thoughts";
                  break;
                  case "thinkGolf":
                    title="Think Golf";
                break;
                case "makeMeSmile":
                  title="Make Me Smile";
                  break;
                  case "week":
                    title="Week";
                    break;
                    case "day":
                      title="Day";
                break;
                default:
                title="THIS SHOULD BOT GO"
                
            }
            
            return{
              title,
              description: data[key]
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
            title="Synergy"
            subtitle="Overview"
            md="6"
            className="ml-sm-auto mr-sm-auto"
          />
      
          <Col style={{    "textAlign": "right",
    "marginTop": "34px",
    "paddingRight": "214px"}} md="6"> 

  <Tag color="geekblue">{this.state.day}</Tag>
    <Tag color="magenta">WEEK: {this.state.week}</Tag>
          </Col>
  {/* </Col> */}
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
