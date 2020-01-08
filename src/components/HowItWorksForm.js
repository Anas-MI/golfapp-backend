import React, { Component } from "react";
import apiList from "../services/apis/apiList";
import axios from "axios";
import { message, Input} from "antd";

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

message.config({
  top: 80
});



export default class HowItWorksForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {}
    };
  }

  componentDidMount() {
    const { getHowItWorks } = apiList;
    
    axios
      .get(getHowItWorks)
      .then(res => {
        if (res.status === 200) {
          this.setState({ ...res.data.data[0] });
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


 
  submitForm(e) {
    e.preventDefault();
    const key = "updatingDetails";
    const openMessage = () => {
      message.loading({ content: "Updating - How it works", key });
    };
    openMessage();
    const { updateHowItWorks } = apiList;
    const updateHowItWorksUrl = updateHowItWorks + this.state._id;
    console.log(updateHowItWorksUrl);
    let {
      content
    } = this.state;

    const body = {
     content
    };

    axios
      .post(updateHowItWorksUrl, { ...body })
      .then(res => {
        if (res.status === 200) {
          setTimeout(() => {
            message.success({
              content: "How it Works - Updated",
              key,
              duration: 3
            });
            window.location.reload()
          }, 1000);
        } else {
          console.log({ res });
        }
      })
      .catch(err => {
        console.log({ err });
      });
  }

 
  render() {


   

    return (
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">How it works - Content</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form>
                  <Row form>
                    <Col md="12" className="form-group">
                      <label htmlFor="feName">Content</label>

                      <TextArea
                        placeholder="Content..  "
                        onChange={this.handleChange.bind(this, "content")}
                        value={this.state.content}
                        required={true}
                        autoSize
                      />
                    </Col>
                    
                  <Button theme="accent" onClick={this.submitForm.bind(this)}>
                    Update
                  </Button>
                  </Row>
                </Form >
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  }
}
