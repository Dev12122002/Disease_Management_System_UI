import React from 'react'
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
// import Axios from "axios";
// import {
//     MDBBtn,
//     MDBContainer,
//     MDBCard,
//     MDBCardBody,
//     MDBCol,
//     MDBRow,
//     MDBInput,
//     MDBCheckbox,
//     MDBIcon
// }
//     from 'mdb-react-ui-kit';
// import Alert from "../components/Alert";
// import { MDBAlert } from 'mdbreact';
import AuthService from "../services/auth.service";
import Header from "../components/Header";
// import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "./Login.css"

export default function Login() {

    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
    });

    // const [redirect, setRedirect] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const JwtToken = AuthService.getCurrentUserJWT();
        if (JwtToken) {
            navigate("/");
        }
    }, [])

    const onChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };

    const loginSubmit = async (e) => {
        e.preventDefault();

        const response = AuthService.login(formValue.email, formValue.password).then(
            () => {
                console.log("login done");
                // Header.refresh();
                navigate("/");
            },
            error => {
                console.log(error.response.data);
                toast.error(error.response.data)
            }
        );

    }

    return (
        //     <MDBContainer fluid className='container-fluid'>
        //       <Header />

        //       <div className="p-5 bg-image w-100" style={{ width: '100%', backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/006/852/804/original/abstract-blue-background-simple-design-for-your-website-free-vector.jpg)', height: '250px' }}></div>

        //       <MDBCard className='mx-auto mb-5 p-5 shadow-5' style={{ marginTop: '-100px', width: '50%', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)' }}>
        //           <MDBCardBody className='p-5 text-center'>

        //               <h2 className="fw-bold mb-5">Login</h2>

        //                 <MDBInput value={formValue.email} name='email' onChange={onChange} required wrapperclassName='mb-4' label='Email' id='email' type='email'/>
        //                 <MDBInput value={formValue.password} name='password' onChange={onChange} required wrapperclassName='mb-4' label='Password' id='password' type='password'/>

        //               <MDBBtn className='w-100 mb-4' type='submit' size='md' onClick={loginSubmit}>Login</MDBBtn>

        //           </MDBCardBody>
        //       </MDBCard>

        //   </MDBContainer>


        <>
            <Header />
            <section className="text-center">

                <div className="p-5 bg-image" style={{ width: '100%', backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/006/852/804/original/abstract-blue-background-simple-design-for-your-website-free-vector.jpg)', height: '250px' }}></div>


                <div className="card mx-4 shadow-5-strong mx-auto" style={{ marginTop: '-100px', width: '50%', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)' }}>
                    <div className="card-body py-5 px-md-5">

                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <h2 className="fw-bold mb-5">Login</h2>
                                <form>

                                    <div className="form-floating mb-5">
                                        <input type="email" value={formValue.email} name='email' onChange={onChange} required="true" id="email" className="form-control" placeholder="Email" />
                                        <label className="form-label" for="email">Email</label>
                                    </div>


                                    <div className="form-floating mb-4">
                                        <input type="password" value={formValue.password} name='password' onChange={onChange} required="true" id="password" className="form-control" placeholder="Password" />
                                        <label className="form-label" for="password">Password</label>
                                    </div>

                                    {/* <button type="submit" onClick={loginSubmit} className="btn btn-primary btn-block mb-4">
                                        Login
                                    </button> */}

                                    <div className="text-center pt-1 mb-2 pb-1">
                                        <button onClick={loginSubmit} className="btn btn-primary btn-block fa-lg mb-4 w-100 mx-auto" type="submit">Login</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
