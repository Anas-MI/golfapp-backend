import React, { Component } from "react";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import { Row, Container, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import { Table, Input, Button, Icon, Tag, Divider } from "antd";
import apiList from "../services/apis/apiList";
import axios from "axios";
const { favoritesGetAllApi } = apiList;

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
      favoritesList: []
    };
  }

  componentDidMount() {

    function convertTime(serverdate) {
        var date = new Date(serverdate);
        // convert to utc time
        var toutc = date.toUTCString();
        //convert to local time
        var locdat = new Date(toutc + " UTC");
        return locdat;
      }
  

    axios
      .get(favoritesGetAllApi)
      .then(res => {
        if (res.status === 200) {
          console.log({res})
          if (res.data) {
            this.favoritesList = res.data.data.map((favorite, index) => ({
              key: index + 1,
              name: favorite.user.name ? favorite.user.name : "-",
              email: favorite.user.email ? favorite.user.email : "No Email Given",
              synergistic: favorite.synergistic.name ? favorite.synergistic.name : "Not ID Given",
              createdAt: favorite.createdAt ? convertTime(favorite.createdAt).toString() : "-",
              id: favorite.synergistic._id ? favorite.synergistic._id : "Not Found"
            }));

            this.setState({ favoritesList: this.favoritesList });
          
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
        title: "Email",
        dataIndex: "email",
        key: "email",
        ...this.getColumnSearchProps("email")
      },
      {
        
          ...this.getColumnSearchProps("synergistic"),
        title: "Synergistic",
        dataIndex: "synergistic",
        key: "synergistic",
        sorter: (a, b) => a.key - b.key,
        render: (text, record) => (
            <div>
          <Link to={`/view/synergy/${record.id}`}>{text}</Link> 
         
         
            </div>
        )
      },
      {
        title: "Added At",
        dataIndex: "createdAt",
        key: "createdAt",
        sorter: (a, b) => a.createdAt.length - b.createdAt.length,
        render: tag => {
          return (
            <span>
              <Tag color="volcano" key={tag}>
                {tag}
              </Tag>
            </span>
          );
        }
      }
   
    ];
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Favorites"
            subtitle="Fit For Golf"
            md="12"
            className="ml-sm-auto mr-sm-auto"
          />
      
        </Row>
        <div className="card">
        <Table columns={columns} dataSource={this.state.favoritesList} />
        </div>
      </Container>
    );
  }
}
