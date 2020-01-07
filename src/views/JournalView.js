import React, { Component } from "react";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import { Row, Container, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import { Table, Input, Button, Icon, Tag, Divider,Popconfirm } from "antd";
import { Modal } from 'antd';
import apiList from "../services/apis/apiList";
import axios from "axios";
const { journalGetAllApi } = apiList;
const { TextArea } = Input;

//Modal







export default class Synergistic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
      journalList: [],
      visible: false,
      confirmLoading: false,
      disabled: true,
      question:""
    };
  }

  handleChange(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
    
    if(this.state.question.length < 3){
        this.setState({disabled: true})
} else if(this.state.question.length > 3){
    this.setState({disabled: false})

}
  
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: 'Saving...',
      confirmLoading: true,
    });
    setTimeout(() => {

           const { journalCreateApi } = apiList;

        let {question} = this.state
    axios
      .post(journalCreateApi, {question})
      .then(res => {
        if (res.status === 200) {
          console.log(res)
          this.setState({
            visible: false,
            confirmLoading: false,
          });
        }
        window.location.reload();
      })
      .catch(err => {
        console.log({ err });
      });


    
    }, 1500);
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
    axios
      .get(journalGetAllApi)
      .then(res => {
        if (res.status === 200) {
          
          if (res.data) {
            this.journalList = res.data.data.map((journal, index) => ({
              key: index + 1,
              question: journal.question ? journal.question : "-",
              id: journal._id ? journal._id : "Not Found"

            }));

            this.setState({ journalList: this.journalList });
            
          
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

  confirm(record, b) {
      
    const { journalCommonApi } = apiList;
    const journalCommonApiUrl = journalCommonApi + "/delete/" + record.id;
    console.log(journalCommonApiUrl)
    axios
      .delete(journalCommonApiUrl)
      .then(res => {
        console.log(res)

        if (res.status === 200) {
          
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        }
      })
      .catch(err => {
        console.log({ err });
      });
  }

  render() {

    const { visible, confirmLoading, ModalText } = this.state;
   

    const columns = [
      {
        title: "No.",
        dataIndex: "key",
        key: "key",
        width: "8%",
        sorter: (a, b) => a.key - b.key
      },
      {
        title: "Question",
        dataIndex: "question",
        key: "question",
        // width: "20%",
        ...this.getColumnSearchProps("question")
      },
    //   {
    //     title: "Goal",
    //     dataIndex: "goal",
    //     key: "goal",
    //     ...this.getColumnSearchProps("goal")
    //   },
    //   {
    //     title: "Week",
    //     dataIndex: "week",
    //     key: "week",
    //     sorter: (a, b) => a.key - b.key,
    //     ...this.getColumnSearchProps("week")
    //   },
    //   {
    //     title: "Day",
    //     dataIndex: "day",
    //     key: "day",
    //     sorter: (a, b) => a.day.length - b.day.length,
    //     render: tag => {
    //       return (
    //         <span>
    //           <Tag color="volcano" key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         </span>
    //       );
    //     }
    //   },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: (text, record) => (
            <div>
                   <Popconfirm
                    placement="right"
                    title="Are you sure you want to delete this Question?"
                    onConfirm={this.confirm.bind(this, record)}
                    okText="Yes"
                    cancelText="No"
                  >
          <Divider type="vertical"/>
           {/* <Link to={`/delete/synergy/${record.id}`}>Delete</Link> */}
        
            <Button
                      style={{     height: "50px" }}
                    //   theme="danger"
                    className=" bg-danger text-white text-center rounded p-3"

                    //   onClick={this.deletePost.bind(this)}
                    >
                      <i className="material-icons ">delete</i>Delete Question
                    </Button>
          <Divider type="vertical"/>

                  </Popconfirm>
       
            </div>
        )
      }
    ];
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Journal"
            subtitle="Fit For Golf"
            md="8"
            className="ml-sm-auto mr-sm-auto"
          />
          <Col className="md-4">
          {/* <Link to={`/create/journal`}> */}
            
            
          <div
        className=" bg-dark text-white text-center rounded p-3"
        onClick={this.showModal}
        style={{ boxShadow: "inset 0 0 5px rgba(0,0,0,.2)", height: "50px", width: "237px", marginLeft: "261px"}}>
        Add New
      </div>
            {/* </Link>  */}
            <Modal
          title="Add a New Question"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          okText="Create"
           okButtonProps= {{
      disabled: this.state.disabled
    }}
        >
            <Col md="12" className="form-group">
        {/* <p>{ModalText}</p> */}
        <label htmlFor="feQuestion">Question</label>

        <TextArea
          placeholder="Your Question..  "
          onChange={this.handleChange.bind(this, "question")}
          value={this.state.question}
          required={true}
          autoSize
        />
      </Col>
        </Modal>

          </Col>
        </Row>
        <Table columns={columns} dataSource={this.state.journalList} />
      </Container>
    );
  }
}
