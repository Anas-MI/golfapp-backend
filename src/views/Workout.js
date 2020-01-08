import React, { Component } from "react";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import { Row, Container, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import { Table, Input, Button, Icon, Tag, Divider, Switch } from "antd";
import apiList from "../services/apis/apiList";
import axios from "axios";
const { workoutGetAll } = apiList;

export default class Workout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
      workoutList: []
    };
  }


 


  componentDidMount() {
    axios
      .get(workoutGetAll)
      .then(res => {
        if (res.status === 200) {
          
          if (res.data) {
            this.workoutList = res.data.data.map((workout, index) => ({
              key: index + 1,
              title: workout.title ? workout.title : "-",
              url: workout.url ? workout.url : "No url Given",
              description: workout.description ? workout.description : "No description Given",
              isPaid: workout.isPaid,
              thumbnail: workout.thumbnail ? workout.thumbnail : "-",
              day: workout.day ? workout.day : "-",
              position: workout.position ? workout.position : "-",
              createdAt: workout.createdAt ? workout.createdAt : "-",
              updatedAt: workout.updatedAt ? workout.updatedAt : "-",
              id: workout._id ? workout._id : "Not Found"
            }));

            this.setState({ workoutList: this.workoutList });
            console.log(this.state)
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
    
    onChange = (checked,value) => {
        console.log(`switch to ${checked}`);
        console.log(value);
        const {changeWorkout} =  apiList;
        const changeWorkoutUrl = changeWorkout + checked;
        axios.post(changeWorkoutUrl, {isPaid: value} ).then(console.log).catch(console.log)
      }
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
        title: "Title",
        dataIndex: "title",
        key: "title",
        width: "20%",
        ...this.getColumnSearchProps("title")
      },
      {
        title: "Url",
        dataIndex: "url",
        key: "url",
        width: "20%",

        ...this.getColumnSearchProps("url")
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
    
        ...this.getColumnSearchProps("description")
      },
      {
    
    title: "Day",
    dataIndex: "day",
    key: "day",
   
    ...this.getColumnSearchProps("day")
  },{
  
  title: "Position",
  dataIndex: "position",
  key: "position",
  width: "8%",

  sorter: (a, b) => a.key - b.key,

},
      {
        title: "Is Paid",
        dataIndex: "isPaid",
        key: "isPaid",
        render: (tag, record) => {
          return (
            <span>
              <Switch onClick={this.onChange.bind(this, record.id)} checkedChildren="Yes" unCheckedChildren="No" defaultChecked={tag}/>
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
         
          <Divider type="vertical"/>
          <Link to={`/edit/workout/${record.id}`}>Edit</Link>
          <Divider type="vertical"/>
         
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
        <Table columns={columns} dataSource={this.state.workoutList} />
      </Container>
    );
  }
}
