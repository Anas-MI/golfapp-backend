import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import HowItWorksForm from "../components/HowItWorksForm";

export class HowItWorks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }



  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="How it works!"
            subtitle="Fit For Golf"
            md="12"
            className="ml-sm-auto mr-sm-auto"
          />
        </Row>
        <Row>
          <Col lg="12">
            <HowItWorksForm  />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HowItWorks;
