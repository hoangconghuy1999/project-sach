import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import axios from "axios";
import Cookies from "js-cookie";
function Modalfunction(props){
    let token = Cookies.get("token", { expires: 2 });
    // let [listUser, setListUser] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
 var listUser=props.listUser
  console.log(listUser)
  const showModal = () => {
    setIsModalVisible(true);
  };
  var [email, setemail] = useState("");
  const handleOk = () => {
    setIsModalVisible(false);
    handleDelete(email)
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
 
  async function handleDelete(email) {
    let response = await axios({
      method: "DELETE",
      url: "http://localhost:1999/user/delete/" + email + "/",
      headers: { Authorization: "Bearer " + token },
    });
    if (response.status === 200) {
      alert("xóa thành công");
    }
  }

  return (
    <>
    
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} listUser={props.listUser} >
        
        <input onChange={(e)=>{
           setemail(e.target.value);
           console.log(listUser)
           
        }} placeholder="nhập id muốn xóa"></input>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default Modalfunction;