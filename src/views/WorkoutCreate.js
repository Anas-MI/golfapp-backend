import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import WorkOutCreateForm from "../components/WorkoutCreateForm";

export class WorkOutCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {}
    };
  }



  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Create Workout"
            subtitle="Fit For Golf"
            md="12"
            className="ml-sm-auto mr-sm-auto"
          />
        </Row>
        <Row>
          <Col lg="12">
            <WorkOutCreateForm  user={this.state.userData} slug={this.props.match.params.id}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default WorkOutCreate;
