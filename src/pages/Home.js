import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import DiseaseComponent from "../components/DiseaseComponent";
import DiseaseInfoComponent from "../components/DiseaseInfoComponent";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import "./Home.css"

export const API_KEY = "a9118a3a";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
// const AppName = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
// `;
// const Header = styled.div`
//   background-color: #18051f;
//   color: white;
//   display: flex;
//   justify-content: space-between;
//   flex-direction: row;
//   align-items: center;
//   padding: 10px;
//   font-size: 25px;
//   font-weight: bold;
//   box-shadow: 0 3px 6px 0 #555;
// `;
// const SearchBox = styled.div`
//   display: flex;
//   flex-direction: row;
//   padding: 10px 10px;
//   border-radius: 6px;
//   margin-left: 20px;
//   align-items: center;
//   width: 30%;
//   background-color: white;
// `;
// const SearchIcon = styled.img`
//   width: 32px;
//   height: 32px;
// `;
// const CloseIcon = styled.img`
//   width: 25px;
//   height: 25px;
//   margin-left: 35%;
//   &:hover{
//     width: 30px;
//     height: 30px;
//     transition: 0.3s;
//   }
// `;
// const DiseaseImage = styled.img`
//   width: 48px;
//   height: 48px;
//   margin: 15px;
// `;
// const SearchInput = styled.input`
//   color: black;
//   font-size: 16px;
//   font-weight: bold;
//   border: none;
//   outline: none;
//   margin-left: 15px;
// `;
const DiseaseListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

function Home() {
    const [searchQuery, updateSearchQuery] = useState("");

    const [loggedin, setloggedin] = useState(AuthService.checkLoggedIn());

    const [DiseaseList, updateDiseaseList] = useState([]);
    const [selectedDisease, onDiseaseSelect] = useState();

    const [timeoutId, updateTimeoutId] = useState();

    const fetchData = async (searchString) => {
        if (searchString === "") {
            const response = await Axios.get("/api/Diseas");
            // console.log(response["data"][1]);
            updateDiseaseList(response["data"]);
        } else {
            const response = await Axios.get(`/Diseas/name=${searchString}`);
            console.log(response["data"][1]);
            updateDiseaseList(response["data"]);
        }

    };

    useEffect(() => {
        fetchData("");
    }, [])

    const clearSearch = () => {
        updateSearchQuery("");
        // const timeout = setTimeout(() => fetchData(""), 500);
        fetchData("")
    }

    const onTextChange = (e) => {
        onDiseaseSelect("")
        clearTimeout(timeoutId);
        updateSearchQuery(e.target.value);
        const timeout = setTimeout(() => fetchData(e.target.value), 500);
        updateTimeoutId(timeout);
    };
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
                    </div>
                     */}
                    {loggedin && <Link to="/Disease/AddDisease">Add Disease</Link>}
                    {loggedin ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>}
                </div>

                <div className="SearchBox">
                    <img src="/react-Disease-app/search-icon.svg" className="SearchIcon" />
                    <input
                        placeholder="Search Disease"
                        value={searchQuery}
                        onChange={onTextChange}
                        className="SearchInput"
                    />
                    <img src="/react-Disease-app/close.png" onClick={clearSearch} className="CloseIcon" />
                </div>
            </div>
            {selectedDisease && <DiseaseInfoComponent selectedDisease={selectedDisease} onDiseaseSelect={onDiseaseSelect} />}
            <DiseaseListContainer>
                {DiseaseList?.length ? (
                    DiseaseList.map((Disease, index) => (
                        <DiseaseComponent
                            key={index}
                            Disease={Disease}
                            onDiseaseSelect={onDiseaseSelect}
                        />
                    ))
                ) : (
                    <Placeholder src="/react-Disease-app/virus.png" />
                )}
            </DiseaseListContainer>
        </Container>
    );
}

export default Home;