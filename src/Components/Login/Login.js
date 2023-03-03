import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useSignInWithGoogle, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import app from '../../firebase.init';
import { FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css';

const auth = getAuth(app)

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate =useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/data-entry";

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    const [signInWithEmailAndPassword, emailUser, emailLoading, emailError] = useSignInWithEmailAndPassword(auth);

    const handleEmailBlur = e => {
        setEmail(e.target.value);
    }

    const handlePasswordBlur = e => {
        setPassword(e.target.value);
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password);
    }

    const handleGoogleSignIn = () => {
        console.log("Working with Google Sign in !!")
        signInWithGoogle();
    }

    useEffect(() => {
        if (googleUser) console.log(googleUser.user.email);
    });

    if (googleUser) navigate(from, {replace : true});
    if (emailUser) navigate(from, { replace: true});


    return (
        <div className='w-50 mx-auto border rounded px-4 py-5 mt-5'>
            <form onSubmit={handleFormSubmit} >
                <div className='d-flex justify-content-center'>
                    <h1>Login</h1>
                </div>
                <div className="mb-3 ">
                    <label htmlFor="inputEmail" className="col-form-label">Email</label>
                    <div className="">
                        <input onBlur={handleEmailBlur} type="text" className="form-control" id="inputEmail" required />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="col-form-label">Password</label>
                    <div className="">
                        <input onBlur={handlePasswordBlur} type="password" className="form-control" id="inputPassword" required />
                    </div>
                </div>
                <p className='text-danger text-center'>{emailError?.message}</p>
                <div className='d-flex justify-content-center' >
                    <input className="bg-primary text-white rounded py-2 px-4 border-0" type="submit" id="submitBtn" value="Login" />
                </div>
                <div className='d-flex justify-content-center m-3'>
                    <p>Yet to Sign up ? <Link to='/signup' className='text-decoration-none' > Create Account here </Link> </p>
                </div>
            </form>
            <div className='d-flex justify-content-center' >
                <button onClick={handleGoogleSignIn} className='border-0 rounded d-flex align-items-center p-2'>
                    <FaGoogle className='m-2'></FaGoogle>
                    Sign In With Google
                </button>
            </div>
        </div>
    );
};

export default Login;