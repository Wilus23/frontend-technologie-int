import React, { useState, useEffect } from "react";
import './Loging.css';
import Axios from 'axios';



function Loging(){
const [userName, setUserName] = useState('');
const [id, setId] = useState(0);
const [role, setRole] = useState('');


Axios.get('http://127.0.0.1:3001/users').then((response)=>{
    console.log(response.data)
  })

return(

    <div className="body">Hi there</div>
)

}


export default Loging;