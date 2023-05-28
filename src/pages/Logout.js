import React from 'react'
import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        AuthService.logout();
        navigate("/login");
    }, [])

  return (<></>)
}
