import React, { Component } from "react";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import { Row, Container, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import { Table, Input, Button, Icon, Tag, Divider, Switch } from "antd";
import apiList from "../services/apis/apiList";
import axios from "axios";
const { shipGetAll } = apiList;

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
      .get(shipGetAll)
      .then(res => {
        console.log({res})
        if (res.status === 200) {

          if (res.data) {
            this.shippingList = res.data.data.map((shipping, index) => ({
              key: index + 1,
              createdOn: shipping.createdOn ? shipping.createdOn : "-",
              addressLine1: shipping.addressLine1 ? shipping.addressLine1 : "No address Given",
              addressLine2: shipping.addressLine2 ? shipping.addressLine2 : "No address Line 2 Given",
              country: shipping.country ? shipping.country : "-",              useremail: shipping.user? shipping.user.email : "No email given",
              userid: shipping.user ? shipping.user._id : "No id given",
              state: shipping.state ? shipping.state : "-",
              city: shipping.city ? shipping.city : "-",
              pincode: shipping.pincode ? shipping.pincode : "-",
              paid: shipping.paid,
              id: shipping._id ? shipping._id : "Not Found"
            }));

            this.setState({ shippingList: this.shippingList });
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
        title: "User",
        dataIndex: "useremail",
        key: "useremail",
        width: "20%",
        ...this.getColumnSearchProps("useremail")
      },
      {
        title: "Country",
        dataIndex: "country",
        key: "country",
        width: "20%",

        ...this.getColumnSearchProps("country")
      },
      {
        title: "State",
        dataIndex: "state",
        key: "state",
    
        ...this.getColumnSearchProps("state")
      },
      {
        title: "Payment Status",
        dataIndex: "paid",
        key: "paid",
        render: tag => {
          let isPaid;
          if(tag){
            isPaid= "Paid"
          } else {
            isPaid= "Pending"
          }
          return (
            <span>
              <Tag color="volcano" key={isPaid}>
                {isPaid}
              </Tag>
            </span>
          );
        }
      },
      {
        title: "Ordered On",
        dataIndex: "createdOn",
        key: "createdOn",
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
            title="Workout"
            subtitle="Fit For Golf"
            md="12"
            className="ml-sm-auto mr-sm-auto"
          />
          {/* <Col className="col-md-2">
          <Link to={`/create/workout`}>
            
            
          <div
        className=" bg-dark text-white text-center rounded p-3"
        
        // style={{ boxShadow: "inset 0 0 5px rgba(0,0,0,.2)", height: "50px", width: "237px", marginLeft: "261px"}}
        >
        Add New
      </div>
            </Link> 

          </Col> */}
        </Row>
        <div className="card">
        <Table columns={columns} dataSource={this.state.shippingList} />
        </div>
      </Container>
    );
  }
}
