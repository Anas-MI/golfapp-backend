import React, { Component } from "react";
import {Link} from "react-router-dom"
import Highlighter from "react-highlight-words";
import { Row,Container } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import { Table, Input, Button, Icon, Tag } from "antd";
import apiList from "../services/apis/apiList";
import axios from "axios";
const { getAllUsersApi } = apiList;

export default class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
      usersList: []
    };
  }

  componentDidMount() {
    axios
      .get(getAllUsersApi)
      .then(res => {
        if (res.status === 200) {
          if (res.data) {
            this.userList = res.data.map((user, index) => ({
              key: index + 1,
              device: user.device ? user.device : "-",
              name: user.name ? user.name : "No Name Given",
              email: user.email,
              phone: user.phone ? user.phone : "No Number Given",
              age: user.age ? user.age : "No Age Given",
              status: user.status ? user.status : "Not Set",
              state: user.state ? user.state : "Not Given",
              country: user.country ? user.country : "Not Given",
              id: user._id ? user._id : "Not Found"
            }));

            this.setState({ usersList: this.userList });
          }
        }
      })
      .catch(err => {
        console.log({ err });
      });
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const columns = [
      {
        title: "No.",
        dataIndex: "key",
        key: "key",
        width: "8%",
        filters: [
          {
            text: "Ios",
            value: "ios"
          },
          {
            text: "Android",
            value: "android"
          }
        ],
        onFilter: (value, record) => {
          return record.device.indexOf(value) === 0;
        },
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend"]
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "20%",
        ...this.getColumnSearchProps("name")
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        ...this.getColumnSearchProps("email")
      },
      {
        title: "Phone Number",
        dataIndex: "phone",
        key: "phone",
        ...this.getColumnSearchProps("phone")
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
        width: "8%",
        sorter: (a, b) => a.name.length - b.name.length
      },
      {
        title: "State",
        dataIndex: "state",
        key: "state",
        ...this.getColumnSearchProps("state")
      },
      {
        title: "Country",
        dataIndex: "country",
        key: "country",
        ...this.getColumnSearchProps("country")
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: tag => {
          let color = "volcano";
          if (tag === "active") {
            color = "green";
          } else if (tag === "inactive") {
            color = "red";
          }
          return (
            <span>
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            </span>
          );
        }
      },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
      render: (text, record) => <Link to={`/userprofile/${record.id}`}>Edit</Link>,
      },
    ];
    return (
      
        <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="Users" subtitle="Fit For Golf" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>
    <div className="card">
        <Table className="card" columns={columns} dataSource={this.state.usersList} />
    </div>
      </Container>
    );
  }
}
