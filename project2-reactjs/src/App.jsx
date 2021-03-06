import React,{useEffect, useState} from "react"
import logo from './logo.svg';
import 'antd/dist/antd.css';
import ReactDOM from 'react-dom';
import { Table, Tag, Space } from 'antd';
import { BrowserRouter as Router,Switch, Route, Link } from "react-router-dom";
import Singup from  "./jsx/Singup"
import Login from  "./jsx/Login"
import Home from "./jsx/Home"
import BookCreation from "./jsx/BookCreation"
import DetailUser from "./jsx/DetailUser"
import DetailMain from "./jsx/DetailMain"
import Upload from "./jsx/Upload"
import UploadImg from "./jsx/Upload";
import SwipeableTextMobileStepper from "./jsx/Carosel"
import React, { Suspense } from "react";

// useEffect(())
function App() {
  
    return(   
       
      <Router>
        <p>cho</p>
        <Switch>
          <Route path="/sign-up" exact component={Singup} />
          <Route path="/login" exact component={Login} />
          <Route path="/home" exact component={Home}/>
          <Route path="/BookCreation" exact component={BookCreation}/>
          <Route path="/DetailUser" exact component={DetailUser}/>
          <Route path="/DetailMain" exact component={DetailMain}/>
          <Route path="/Upload" exact component={UploadImg}/>
          <Route path="/Carosel" exact component={SwipeableTextMobileStepper}/>
        </Switch>
      </Router>
    );
}
export default App;
