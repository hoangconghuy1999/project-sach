import React, { useState } from "react";
import "../css/login.css"
import axios from 'axios';
import Cookies from 'js-cookie';
function Login(){
    let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
    return(
        <div className="form-singup">
         <input className="input-login" type="text" placeholder="email" onChange={(e) => {
              setEmail(e.target.value);
         }}/><br/>
          <input className="input-login" type="text" placeholder="mật khẩu" onChange={(e) => {
              setPassword(e.target.value);
         }}/><br/>
          <button className="button-login" onClick={async () => {
            try {
              let response = await axios({
                method: 'post',
                url: 'http://localhost:1999/user/login',
                data: {
                  email: email,
                  password
                }
              });
              console.log(response);
             if(response.status === 200){
               
                Cookies.set("token", response.data.token,{expires:2});
                console.log("hh", response.data)
             return window.location.href = "/home"


             }
            } catch (error) {
              
            }
          }}>Đăng nhập</button>
     </div>
    );
}
export default Login;