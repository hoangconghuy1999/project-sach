import React from "react";
import { Pagination } from 'antd';
function Page(props){
    return(
        <div>
           <Pagination 
           defaultCurrent={1} 
           defaultpageSize={props.defaultpageSize}
           total={props.total} 
           onChange={props.onChange}
           pageSize = {props.pageSize}
           showSizeChanger={true}
           pageSizeOptions={[5,10,15,20]}
           />
        </div>
   
    );
}

export default Page;