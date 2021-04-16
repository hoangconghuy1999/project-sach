var User =(props)=>{
    return(
        <div>
            <tr>
                <td>{props.User._id}</td>
                <td>{props.User.email}</td>
                <td>{props.User.password}</td>
            </tr>
        </div>
    )
}
export default User