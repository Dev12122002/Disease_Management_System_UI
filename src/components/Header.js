import React from 'react'
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthService from "../services/auth.service";
import "./Header.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Header() {

    const [loggedin, setloggedin] = useState(AuthService.checkLoggedIn());

    const location = useLocation();
    const navigate = useNavigate();

    // const logOut = () => {
    //     AuthService.logout();
    //     setloggedin(false)
    //     navigate("/login");
    //     // window.location.reload(false);
    // }

    // useEffect(() => {
    //     setloggedin(AuthService.checkLoggedIn());
    // }, [])

//   if(location.pathname !== "/"){
      return (
          <Container>
              <div className="Header">
                  <div className="AppName">
                      <img src="/react-Disease-app/virus.png" />
                      React Disease App
                  </div>

                  <div className="navbar">
                      <Link to="/">Home</Link>
                      {/* <div className="dropdown">
                          <button className="dropbtn">Pages
                              <i className="fa fa-caret-down"></i>
                          </button>
                          <div className="dropdown-content">
                              <Link to="/">Home</Link>
                              <Link to="/">Home</Link>
                              <Link to="/">Home</Link>
                          </div>
                      </div> */}
                      {loggedin && <Link to="/Disease/AddDisease">Add Disease</Link>}
                      {loggedin ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>}
                      
                  </div>

              </div>
          </Container>
      )
//   }
//   else{
//     return(
//         <></>
//     )
//   }
}
