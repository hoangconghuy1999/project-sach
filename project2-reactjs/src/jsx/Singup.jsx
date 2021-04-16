import React, { useState } from "react";
import "../css/sing-up.css"
import axios from 'axios';
function Singup (){
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  return(
     <div className="form-singup">
         <input className="input-singup" type="text" placeholder="email" onChange={(e) => {
              setEmail(e.target.value);
         }}/><br/>
          <input className="input-singup" type="text" placeholder="mật khẩu" onChange={(e) => {
              setPassword(e.target.value);
         }}/><br/>
          <button className="button-singup" onClick={async () => {
            try {
              let response = await axios({
                method: 'post',
                url: 'http://localhost:1999/user/sign-up',
                data: {
                  email: email,
                  password
                }
                
              });
              if(response.status===200){
                alert ("tạo tài khoản thành công")
                return window.location.href = "/login"
              }                                        
            } catch (error) {
              
            }
          }}>Đăng ký</button>
     </div>
  );
}
    
 export default Singup ;