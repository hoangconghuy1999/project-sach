import React, { useEffect, useState } from "react";
// import React from "react"
// import ReactDOM from 'react-dom';
import axios from "axios";
import Cookies from "js-cookie";
import Page from "./Page";
// import "./Login"
// import { Table } from "antd";

import { Modal, Button } from "antd";
import "../css/Home.css";
// import { PromiseProvider } from "mongoose";
// import BookCreation from "./bookCreation";
function Home() {
  let [listUser, setListUser] = useState([]);
  let [pageSize, setPageSize] = useState(5);
  let [showUser, setShowUser] = useState([])
  let token = Cookies.get("token", { expires: 2 });
  let [user, setUser] = useState({});
  // let [blockModal, setblockModal] = useState("none");
  // let [stt] = useState(1);
  let [isModalVisible, setIsModalVisible] = useState(false);
  // let [id, setid] = useState();
  useEffect(() => {
    let token = Cookies.get("token", { expires: 2 });
    async function blocksau() {
      try {
        let response = await axios({
          method: "GET",
          url: "http://localhost:1999/user/" + token,
        });

        if (response.status === 200) {
          // console.log(response.data);
          setListUser(response.data.value);
          setShowUser(response.data.value.slice(0,pageSize))
        }
      } catch (error) {
        // console.log("lỗi")
      }
    }
    blocksau();
  },[]);
  // useEffect(() => {});
  let showModal = () => {
    setIsModalVisible(true);
  };
  let handleCancel = () => {
    setIsModalVisible(false);
  };
  async function handleDelete(id) {
    let response = await axios({
      method: "DELETE",
      url: "http://localhost:1999/user/" + id + "/" + token,
    });
    if (response.status === 200) {
      alert("xóa thành công");
    }
  }

  var [email, setemail] = useState("");
  var [password, setpassword] = useState("");

  // handlePut()
  async function handlePut(id) {
    console.log(listUser);
    let response = await axios({
      method: "PUT",
      url: "http://localhost:1999/user/" + id + "/" + token,
      data: {
        email: email,
        password,
      },
    });

    console.log(response);

    // if (response.status === 200) {
    //   console.log("cập nhật thành công");
    //   console.log(response);
    // }
    // setIsModalVisible(false);
  }
  let handleOk = (_id) => {
    handlePut(user._id);
  };

  let changePage = (page,size)=>{
    if(size !== pageSize){
      setPageSize(size)
      page=1
    }
    var newData = listUser.slice((page-1)*size,page*size)
    
    setShowUser(newData)
  }

  let ModalUpdate = (
    <Modal
      title="Basic Modal"
      visible={isModalVisible}
      onOk={function () {
        handleOk(user._id);
        handlePut(user._id);
        setIsModalVisible(false);
      }}
      // onok={handlePut(id)}
      onCancel={handleCancel}
    >
      <input
        placeholder="email"
        onChange={(e) => {
          setemail(e.target.value);
        }}
      ></input>
      <input
        placeholder="password"
        onChange={(e) => {
          setpassword(e.target.value);
        }}
      ></input>
      <input></input>
    </Modal>
  );
  return (
    <div>
      <table>
        {ModalUpdate}
        <tr>
          <td className="stt-home">STT:</td>
          <td className="id-home">id:</td>
          <td className="email-home">Email:</td>
          <td>Password:</td>
          <td className="option-home">option:</td>
        </tr>
        {showUser.length
          ? showUser.map((userItem, index) => {
            console.log(userItem)
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{userItem._id}</td>
                  <td>{userItem.email}</td>
                  <td>{userItem.password}</td>
                  <td className="option-home">
                    <button
                      className="delete-width"
                      onClick={() => {
                        handleDelete(userItem._id);
                      }}
                    >
                      xóa
                    </button>
                    <Button
                      id="showModal-put"
                      type="primary"
                      onClick={() => {
                        showModal();
                        setUser(userItem);
                        handlePut(userItem._id);
                      }}
                    >
                      cập nhật
                    </Button>
                    <button onClick={()=>{
                      localStorage.setItem('email', userItem.email);                     
                      return window.location.href="/BookCreation"
                           
                    }}>tạo sách</button>
                  </td>
                </tr>
              );
            })
          : null}
      </table>
      <Page 
      pageSize={pageSize}
      defaultpageSize={5}
      defaultCurrent={1}
      total={listUser.length} 
      onChange={changePage}
      />
    </div>
  );
}
export default Home;
