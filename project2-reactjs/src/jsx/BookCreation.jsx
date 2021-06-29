import React, { useEffect } from "react";
import { Modal, Button } from "antd";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../css/Book.css";
import { Pagination } from "antd";
function BookCreation() {
  let [name, setbookTitle] = useState("");
  let [img, setimg] = useState("");
  console.log(img)
  let token = Cookies.get("token", { expires: 2 });
  console.log(token._id,11)
  let [listUser, setListUser] = useState([]);
  let [showBook, setShowBook] = useState([]);
  let [userbook, setuserbook] = useState({});
  let [pageSize, setPageSize] = useState(3);
  let [page, setpage] = useState(1);
  let [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (_id) => {
    console.log(_id, 22);
    bookput(userbook._id);
    console.log(23, userbook._id);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  let [nameUpdate, setnameUpdate] = useState("");
  let [email, setemail] = useState("");
  let ModalUpdate = (
    <Modal
      title="Basic Modal"
      visible={isModalVisible}
      onOk={function () {
        handleOk(userbook._id);
        // console.log(listUser)
        bookput(userbook._id);
        console.log(userbook._id, 40);
      }}
      onCancel={handleCancel}
    >
      <input
        placeholder="name"
        onChange={(e) => {
          setnameUpdate(e.target.value);
          console.log(nameUpdate);
        }}
      ></input>
      <input
        placeholder="email"
        onChange={(e) => {
          setemail(e.target.value);
        }}
      ></input>
    </Modal>
  );
  async function bookput(id) {
    console.log(56, id);
    let response = await axios({
      method: "PUT",
      url: "http://localhost:1999/book/" + id + "/",
      headers: { Authorization: "Bearer " + token },
      data: {
        name: nameUpdate,
        email: email,
      },
    });
    console.log(response);
  }
  let changePage = (page, size) => {
    if (size !== pageSize) {
      setPageSize(size);
      page = 1;
    }

    setpage(page);
    var newData = listUser.slice((page - 1) * size, page * size);

    setShowBook(newData);
  };
  // console.log(page, 80);
  let x = (page - 1) * pageSize + 1;
  return (
    <div className="div-tong">
      <input
        className="name-book"
        type="text"
        placeholder="tên sách bạn muốn tạo"
        onChange={(e) => {
          setbookTitle(e.target.value);
        }}
      />
      <input type="text" placeholder="img"
      onChange={(e)=>{
          setimg(e.target.value);
      }} />
      <form action="http://localhost:1999/user/uploadfile" enctype="multipart/form-data" method="post">
        <input type="file" id="myfile" name="myFile" /><br />
        <input type="submit"  />
      </form>
      <br />
      <select name="" id="">
        <option value="">1</option>
        <option value="">2</option>
      </select>

      <button
        className="ok-button"
        onClick={async () => {
          try {
            console.log(localStorage.getItem("email"));
            console.log(token, 105);
            let response = await axios({
              method: "POST",
              url: "http://localhost:1999/book/",
              headers: { Authorization: "Bearer " + token },
              data: {
                name: name,
                email: localStorage.getItem("email"),
                img:img,
              },
            });
            if (response.status === 200) {
              console.log(response);
            }
          } catch (err) {}
        }}
      >
        xác nhận tạo{" "}
      </button>
      <br />
      <button
        onClick={async () => {
          try {
            let response = await axios({
              method: "GET",
              url: "http://localhost:1999/book/",
              headers: { Authorization: "Bearer " + token },
            });

            if (response.status === 200) {
              setListUser(response.data.value);

              setShowBook(response.data.value.slice(0, pageSize));
            }
          } catch (error) {}
        }}
      >
        sách đã tạo
      </button>
      <div>
        <table className="table-w100">
          <tr>
            <td className="stt-w10">stt</td>
            <td className="id-w10">id</td>
            <td className="name-w20">name</td>
            <td className="email-w30">email</td>
            <td> option </td>
            {ModalUpdate}
          </tr>
          {showBook.length
            ? showBook.map((bookItem, index) => {
                return (
                  <tr key={index}>
                    <td>{x++}</td>
                    <td>{bookItem._id}</td>
                    <td>{bookItem.name}</td>
                    <td>{bookItem.email}</td>
                    <td>
                      <button
                        onClick={async () => {
                          try {
                            let response = await axios({
                              method: "DELETE",
                              url:
                                "http://localhost:1999/book/" +
                                bookItem._id +
                                "/",
                              headers: { Authorization: "Bearer " + token },
                            });

                            if (response.status === 200) {
                              alert("xóa thành công");
                              //   setShowUser(response.data.value.slice(0,pageSize))
                            }
                          } catch (error) {
                            console.log("lỗi" + error);
                          }
                        }}
                      >
                        xóa
                      </button>
                      <Button
                        type="primary"
                        onClick={() => {
                          showModal();
                          setuserbook(bookItem);
                          bookput(bookItem._id);
                        }}
                      >
                        cập nhật
                      </Button>
                      <button
                        onClick={() => {
                          localStorage.setItem("id", bookItem._id);
                          return (window.location.href = "DetailUser");
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
        <Pagination
          defaultCurrent={1}
          total={listUser.length}
          defaultpageSize={5}
          onChange={changePage}
          pageSize={pageSize}
          showSizeChanger={true}
          pageSizeOptions={[3, 6, 9, listUser.length]}
        />
      </div>
      {/* { !user.role || user.role === 'user'? null :
      <b>nhớ mãi</b>
      } */}
    </div>
  );
}

// BookCreation()
export default BookCreation;
