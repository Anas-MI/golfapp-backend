import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import apiList from "../services/apis/apiList"


const {paypalBuyBook} = apiList;
export default class Success extends Component {
  constructor() {
    super();
  
  this.state = {
      paymentId:"",
      token:"",
      PayerID:""
  }

  
  }

  componentDidMount(){
    console.log(this.props)
    let query = new URLSearchParams(this.props.location.search);
const paymentId = query.get('paymentId')
const token = query.get('token')
const PayerID = query.get('PayerID')
this.setState({paymentId, token, PayerID})
    
      Axios.post(paypalBuyBook, {
        paymentId,
        token,
        PayerID
      }).then(data => console.log(data)).catch(console.log)
  }
 

  render() {
    // success-paypal?paymentId=PAYID-LYOFWMQ3JY355795D503082M&token=EC-7P954691YK174841H&PayerID=E6KJ9NUDMGGEJ 
    
    
    return (
      <div>
       Transaction Successful! <br/>
       Press back and continue using the app.
        
      </div>
    );
  }
}
