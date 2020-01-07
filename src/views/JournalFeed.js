import React, { Component } from "react";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import { Row, Container, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import { Table, Input, Button, Icon, Tag, Divider } from "antd";
import apiList from "../services/apis/apiList";
import axios from "axios";
import {  Badge, Menu, Dropdown } from 'antd';
const { journalFeedGetAllApi } = apiList;








export default class Synergistic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
      journalFeedList: []
    };
  }

//Ant design nested table code begins




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
      .get(journalFeedGetAllApi)
      .then(res => {
        if (res.status === 200) {
          
          if (res.data) {
            this.journalList = res.data.data.map((journalFeed, index) => ({
              key: index + 1,
              name: journalFeed.user.name ? journalFeed.user.name : "-",
              email: journalFeed.user.email ? journalFeed.user.email : "No Email Given",
              week: journalFeed.week ? journalFeed.week : "No Week Given",
              createdAt: journalFeed.createdAt ? convertTime(journalFeed.createdAt).toString()  : "No Date Given",
              id: journalFeed._id ? journalFeed._id : "Not Found",
              journalFeed: journalFeed.journalFeed ? journalFeed.journalFeed : []
            }));

            this.setState({ journalFeedList: this.journalList });
          console.log(this.state.journalFeedList)
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


    
    
        const expandedRowRender = (record) => {
           
           
           let singleJournal = record.journalFeed.map(journal => {
               return <div>
           <h5 style={{fontWeight: "700"}}>{journal.question}</h5>
           <p>{journal.answer}</p>
               </div>
           })
           
            console.log({singleJournal})
         
        
    
    
        //   return <Table columns={columns} dataSource={data} pagination={false} />;
        return singleJournal
        }
    
    












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
        title: "Week",
        dataIndex: "week",
        key: "week",
        sorter: (a, b) => a.key - b.key,
        ...this.getColumnSearchProps("week")
      },
      {
        title: "Created At",
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
      },

    ];
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Journal Feed"
            subtitle="Fit For Golf"
            md="12"
            className="ml-sm-auto mr-sm-auto"
          />
          
        </Row>
        <Table columns={columns} expandedRowRender={expandedRowRender} dataSource={this.state.journalFeedList} />
      </Container>
    );
  }
}
    