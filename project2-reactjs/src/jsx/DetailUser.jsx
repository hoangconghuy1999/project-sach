import "../css/DetailBook.css";
import React, {useEffect,useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function DetailUser() {
    let token = Cookies.get("token", { expires: 2 });
    let [lisBook,setlisBook]= useState([])
    let id = localStorage.getItem("id")
useEffect(() => {
    async function blocksau() {
        try {
          let response = await axios({
            method: "GET",
            url: "http://localhost:1999/book/" + id + "/" + token,
          });
  
          if (response.status === 200) {
            setlisBook([response.data.value]);           
          }
        } catch (error) {
          // console.log("lỗi")
        }
      }
      blocksau();
},[])      
  return (
    <table>
      <tr>
        <td className="book-detail-id">id</td>
        <td className="book-detail-name">name</td>
        <td className="book-detail-emai">email</td>       
      </tr>      
      {lisBook.length ? lisBook.map((userItem, index) => {
          console.log("hh")
          console.log(userItem,37)
          return (
              <tr key ={index}>
                  <td>{userItem._id}</td>
                  <td>{userItem.name}</td>
                  <td>{userItem.email}</td>
              </tr>
          );
          })
        :console.log(lisBook,45) }
    </table>
  );
}
export default DetailUser;
