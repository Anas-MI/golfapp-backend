import React, { Component } from "react";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import { Row, Container, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import { Table, Input, Button, Icon, Tag, Divider } from "antd";
import apiList from "../services/apis/apiList";
import axios from "axios";
const { synergyGetAllApi } = apiList;

export default class Synergistic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
      synergyList: []
    };
  }

  componentDidMount() {
    axios
      .get(synergyGetAllApi)
      .then(res => {
        if (res.status === 200) {
          
          if (res.data) {
            this.synergyList = res.data.data.map((synergy, index) => ({
              key: index + 1,
              name: synergy.name ? synergy.name : "-",
              goal: synergy.goal ? synergy.goal : "No Goal Given",
              week: synergy.week ? synergy.week : "No Week Given",
              day: synergy.day ? synergy.day : "No Day Given",
              id: synergy._id ? synergy._id : "Not Found"
            }));

            this.setState({ synergyList: this.synergyList });
          
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
        sorter: (a, b) => a.key - b.key
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "20%",
        ...this.getColumnSearchProps("name")
      },
      {
        title: "Goal",
        dataIndex: "goal",
        key: "goal",
        ...this.getColumnSearchProps("goal")
      },
      {
        title: "Week",
        dataIndex: "week",
        key: "week",
        sorter: (a, b) => a.key - b.key,
        ...this.getColumnSearchProps("week")
      },
      {
        title: "Day",
        dataIndex: "day",
        key: "day",
        sorter: (a, b) => a.day.length - b.day.length,
        render: tag => {
          return (
            <span>
              <Tag color="volcano" key={tag}>
                {tag.toUpperCase()}
              </Tag>
            </span>
          );
        }
      },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: (text, record) => (
            <div>
          <Link to={`/view/synergy/${record.id}`}>Show</Link> 
          <Divider type="vertical"/>
          <Link to={`/edit/synergy/${record.id}`}>Edit</Link>
            </div>
        )
      }
    ];
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Synergistic"
            subtitle="Fit For Golf"
            md="8"
            className="ml-sm-auto mr-sm-auto"
          />
          <Col className="md-4">
          <Link to={`/create/synergy`}>
            
            
          <div
        className=" bg-dark text-white text-center rounded p-3"
        
        style={{ boxShadow: "inset 0 0 5px rgba(0,0,0,.2)", height: "50px", width: "237px", marginLeft: "261px"}}>
        Add New
      </div>
            </Link> 

          </Col>
        </Row>
        <Table columns={columns} dataSource={this.state.synergyList} />
      </Container>
    );
  }
}
