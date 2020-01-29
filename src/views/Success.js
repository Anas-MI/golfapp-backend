import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import apiList from "../services/apis/apiList"


const {paypalBuyBook, paypalWorkout, paypalBuyEbook} = apiList;
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
const type = query.get('type')


this.setState({paymentId, token, PayerID})

if(type === "workout"){

  const type = query.get('type')
  const userId = query.get('userid')
  const videoId = query.get('videoid')

  Axios.post(paypalWorkout, {
    userId, 
    videoId
  }).then(data => console.log(data)).catch(console.log)
} else if(type==="ebook"){
  const id = query.get('userid')

  Axios.post(paypalBuyEbook, {
    id
  }).then(data => console.log(data)).catch(console.log)
} else {
  Axios.post(paypalBuyBook, {
    paymentId,
    token,
    PayerID
  }).then(data => console.log(data)).catch(console.log)
}
    
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
