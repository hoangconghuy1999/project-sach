// import ReactDOM from 'react-dom';
import { useEffect, useState } from "react";
import {get} from "../utils/FetchAPI"
import Cookies from "js-cookie";
import axios from "axios";
// })
function DetailMain (){
    let [listUser,setlisUser]= useState([])
    let id = localStorage.getItem("id")
    let token = Cookies.get("token", { expires: 2 });
    
    useEffect(()=>{
        async function fetchData() {
            try {
                let response = await axios({
                  method: "GET",
                  url: "http://localhost:1999/user/" + id +"/",
                  headers:{ "Authorization": "Bearer "+ token}
                });
        
                if (response.status === 200) {
                 
                  setlisUser([response.data.value]);
                  
                }
              } catch (error) {
                // console.log("lỗi")
              }
            
        }
        fetchData();
    }, []);
   
    return(
        <table>
            <tr>
                <td>id</td>
                <td>username</td>
                <td>email</td>
                <td>password</td>
                <td>opition</td>
            </tr>
            {listUser.length ? listUser.map((userItem, index)=>{
                return(
                    <tr key={index}>
                    <td>{userItem._id}</td>
                    <td>{userItem.username}</td>
                    <td>{userItem.email}</td>
                    <td>{userItem.password}</td>
                    <td>opition</td>
                </tr>
                );
             }):null}
        </table>
      
    )
}
export default DetailMain;