import React,{useState} from 'react'
import {notification} from 'antd'
import parse from 'html-react-parser';
//import { Card } from 'antd'


const SubscriptionCard = ({width ="200px",setSubscribe = f => f,subscribe=false,data}) =>{
const { title, content } = data[0];
   const handleChange =() =>{
    notification['success']({
        message:
          'Subscribed Successfully !!',
          duration: 1,
      });
       setSubscribe(true);
   }
    return(<Card width ={ width } >
     <div className={`SubContainer ${subscribe ? "Subscribed" : "Unsubscribe"}`}>
         {parse(title)}
         {parse(content)}
         <input type="button" value={subscribe ? "✓ Subscribed" : "Subscribe"} onClick={handleChange} disabled={subscribe} />
     </div>
    </Card>
    )
}
const Card = (props) => {
    return (
        <div className="subscribe-box" style={{ width: props.width }}>{props.children}</div>
      )
  }



export default SubscriptionCard;