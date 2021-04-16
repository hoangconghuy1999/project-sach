getAllData();

function getAllData() {
    $("#saudata-user").click(() => {
        var token = getCookie("token")
        $.ajax({
                url: "/user/" + token,
                method: "GET"
            })
            .then((data) => {
                console.log(data)

                if (!data.error) {
                    for (var i = 0; i < data.value.length; i++) {
                        var user = data.value[i];
                        var templete = `
                            <tr>
                        <th scope="row">${i+1}</th>
                        <td>${user._id}</td>
                        <td>${user.email}</td>
                        <td>${user.username}</td>
                        <td>${user.password}</td>

                        <td>
                          <button type="button" id="btn-detail" onClick=getDetail("${user._id}")>xem chi tiết</button>  
                          <button type="button" class="btn btn-primary" onClick=editUser("${user._id}") data-toggle="modal" data-target="#editUserModal">
          thay đổi
        </button>
        <button type="button" class="btn btn-primary" onClick=getnewbook("${user._id}") data-toggle="modal" data-target="#editUserModal">
         tạo sách
        </button>
                        </td>

                    </tr>

                            `
                        $("#data-user").append(templete)
                    }
                }

            }).catch((err) => {
                // alert(err)
            });
    })
}

function editUser(dataid) {
    $(".modal-body").attr("data-id", dataid)
    console.log(dataid)
}

function saveUser() {
    var token = getCookie("token")
    var id = $(".modal-body").attr("data-id", );

    console.log(id)
    var body = {
        email: $("#email").val(),
        username: $("#username").val(),
        password: $("#password").val()
    }
    $.ajax({
            url: "/user/" + id + "/" + token,
            method: "PUT",
            data: body

        }).then((data) => {
            alert("caapj nhaat thanh cooong")
            console.log(data);
            return window.location.href = "/detail/" + id;
            getAllData()
            $("#username").val(),
                $("#password").val()
        })
        .catch((err) => {
            return console.log(err)
        });

}


function getDetail(id) {
    window.location.href = "/detail/" + id;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

getdatabook()

function getdatabook() {
    $("#saudata-book").click(()=>{
console.log("helo")
   
    var token = getCookie("token")
    $.ajax({
            url: "/book/" + token,
            method: "GET"
        })
        .then((data) => {
            console.log(data)

            if (!data.error) {
                for (var i = 0; i < data.value.length; i++) {
                    var book = data.value[i];
                    var templete = `
                            <tr>
                        <th scope="row">${i+1}</th>
                        <td>${book._id}</td>
                        <td>${book.email}</td>
                        <td>${book.name}</td>


                        <td>
                          <button type="button" id="btn-detail" onClick=getDetail("${book._id}")>xem chi tiết</button>  
                          <button type="button" class="btn btn-primary" onClick=editUser("${book._id}") data-toggle="modal" data-target="#editUserModal">
          thay đổi
        </button>
        <button type="button" id="btn-delete" onClick=getdelete("${book._id+token}")>xóa</button>
                        </td>

                    </tr>

                            `
                    $("#data-book").append(templete)
                }
            }

        }).catch((err) => {
            // alert(err)
        });
    })
}


function getnewbook(dataidbook) {
    $(".modal-body-book").attr("data-id-book", dataidbook)

}

function savebook() {
    var token = getCookie("token")
    var id = $(".modal-body-book").attr("data-id-book", );

    console.log(id)
    var obj = {
        name: $("#name").val(),
        email: $("#email").val(),
    }
    $.ajax({
        url: "/book/sign-up",
        method: "POST",
        data: obj,
        token: token,
        id: id
    }).then((data) => {
        if (!data.error) {
            alert("tạo tài khoản thành công")
            return res.json({
                data
            })
        }
        alert("bạn ko có quyền")
    }).catch((err) => {
        console.log(err);
        alert(err)
    });
}
$("#btn-log-out").click(() => {
    window.location.href = "/login"
})
$("newbook").click(() => {

})