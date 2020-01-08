import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import WorkoutEditForm from "../components/WorkoutEdit";

export class WorkOutEdit extends Component {
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
            title="Edit Workout"
            subtitle="Fit For Golf"
            md="12"
            className="ml-sm-auto mr-sm-auto"
          />
        </Row>
        <Row>
          <Col lg="12">
            <WorkoutEditForm  user={this.state.userData} slug={this.props.match.params.id}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default WorkOutEdit;
