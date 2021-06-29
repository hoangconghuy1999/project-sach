import React, { useEffect, useState, useRef } from "react";
// import React from "react"
// import ReactDOM from 'react-dom';
import axios from "axios";
import Cookies from "js-cookie";
import Page from "./Page";
import Modalfunction from "./Modal";
import { Row, Col } from "antd";
// import "./Login"
// import { Table } from "antd";
import { get } from "../utils/FetchAPI";
import { Modal, Button } from "antd";
import "../css/Home.css";

// import { get } from "../../../nộp chieu/routers/userRouter";
// import { PromiseProvider } from "mongoose";
// import BookCreation from "./bookCreation";
function Home() {
  let [listUser, setListUser] = useState([]);
  let [pageSize, setPageSize] = useState(5);
  let [page, setPage] = useState(1);
  let [showUser, setShowUser] = useState([]);
  let token = Cookies.get("token", { expires: 2 });
  let [user, setUser] = useState({});
   let response= localStorage.getItem("response")
   console.log(response,26)
  // let [blockModal, setblockModal] = useState("none");
  // let [stt] = useState(1);
  let [isModalVisible, setIsModalVisible] = useState(false);
  // let [id, setid] = useState();
console.log(token,29)
  useEffect(() => {
    
    // let token = Cookies.get("token", { expires: 2 });
    async function blocksau() {
      try {
        let response = await axios({
          method: "GET",
          url: "http://localhost:1999/user/",
          headers: { Authorization: "Bearer " + token },
        });
        console.log(response);

        if (response.status === 200) {
          setListUser(response.data.value);
          setShowUser(response.data.value.slice(0, pageSize));
        }
      } catch (error) {
        // console.log("lỗi")
      }
    }
    blocksau();
  }, []);
  console.log(listUser, 50);
  let val = useRef(null);
  let valPass = useRef(null);
  let showModal = () => {
    setIsModalVisible(true);
  };
  let handleCancel = () => {
    val.current.value = "";
    valPass.current.value = "";
    setIsModalVisible(false);
  };
  async function handleDelete(id) {
    let response = await axios({
      method: "DELETE",
      url: "http://localhost:1999/user/" + id + "/",
      headers: { Authorization: "Bearer " + token },
    });
    if (response.status === 200) {
      alert("xóa thành công");
    }
  }
  var [email, setemail] = useState("");
  var [password, setpassword] = useState("");

  // handlePut()
  async function handlePut(id) {
    let response = await axios({
      method: "PUT",
      url: "http://localhost:1999/user/" + id + "/",
      headers: { Authorization: "Bearer " + token },
      data: {
        email: email,
        password,
      },
    });

    // if (response.status === 200) {
    //   console.log("cập nhật thành công");
    //   console.log(response);
    // }
    // setIsModalVisible(false);
  }
  let handleOk = (_id) => {
    handlePut(user._id);
  };

  let changePage = (page, size) => {
    if (size !== pageSize) {
      setPageSize(size);
      page = 1;
    }
    setPage(page);
    var newData = listUser.slice((page - 1) * size, page * size);

    setShowUser(newData);
  };
  let x = (page - 1) * pageSize + 1;
  let ModalUpdate = (
    <Modal
      title="Basic Modal"
      visible={isModalVisible}
      onOk={function () {
        alert(val.current.value);
        handleOk(user._id);
        handlePut(user._id);
        setIsModalVisible(false);
        val.current.value = "";
        valPass.current.value = "";
      }}
      // onok={handlePut(id)}
      onCancel={handleCancel}
    >
      <input
        ref={val}
        placeholder="email"
        onChange={(e) => {
          setemail(e.target.value);
        }}
      ></input>
      <input
        ref={valPass}
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
              const id = userItem._id;

              console.log(index);
              return (
                <tr key={index}>
                  <td>{x++}</td>
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
                    <button
                      onClick={() => {
                        localStorage.setItem("email", userItem.email);
                        return (window.location.href = "/BookCreation");
                      }}
                    >
                      tạo sách
                    </button>

                    <button
                      onClick={() => {
                        localStorage.setItem("id", userItem._id);
                        return (window.location.href = "./DetailMain");
                      }}
                    >
                      xem chi tiết
                    </button>
                  </td>
                </tr>               
              );
            
            })
            
          : null}
          
      </table>
      <form action="/user/uploadfile" enctype="multipart/form-data" method="POST">
        <input type="file" id="myfile" name="myFile" /><br />
        <input type="submit"  />
      </form>
      <Modalfunction
      listUser={listUser}
      />
      

      {response==="admin"? 
      <div>
        <h1>23</h1>
        <p>lo</p>
      </div>
      :null        
      }
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
