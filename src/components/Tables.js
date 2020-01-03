import React, { Component } from "react";
import { Table } from "antd";

export default class Tables extends Component {
  render() {
    return (
      <Table
        columns={this.props.columns}
        dataSource={this.props.dataSource}
        onChange={this.props.onChange}
      />
    );
  }
}
