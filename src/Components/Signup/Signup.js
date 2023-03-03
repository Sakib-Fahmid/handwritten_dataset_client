import React, { useEffect, useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import '../Login/Login.css';
import { getAuth } from 'firebase/auth';
import app from '../../firebase.init';

const auth = getAuth(app)

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, SetConfirmPassword] = useState("");
    const [customError, setCustomError] = useState("");
    const [verificationEmailMessage, setVerificationEmailMessage] = useState("");
    const navigate = useNavigate();

    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

    const handleEmailBlur = e => {
        setEmail(e.target.value)
        console.log(email)
    }
    const handlePasswordBlur = e => {
        setPassword(e.target.value)
        console.log(password)
    }
    const handleConfirmPasswordBlur = e => {
        SetConfirmPassword(e.target.value)
        console.log(confirmPassword)
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        setCustomError("");
        if (password !== confirmPassword){
            setCustomError("Password input don't match !");
            return;
        }
        if (password.length < 6){
            setCustomError("Password cannot be less than Six characters long !");
            return;
        }

        createUserWithEmailAndPassword(email, password);
        alert("New account created. Now you can login !");
    }

    if (user) navigate('/signin');

    return (
        <form onSubmit={handleFormSubmit} className='w-25 mx-auto border rounded p-5 mt-5'>
            <h3 className='text-center'>Sign Up</h3>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input onBlur={handleEmailBlur} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input onBlur={handlePasswordBlur} type="password" className="form-control" id="exampleInputPassword1"></input>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword2" className="form-label">Confirm password</label>
                <input onBlur={handleConfirmPasswordBlur} type="password" className="form-control" id="exampleInputPassword2"></input>
            </div>
            <p>{error?.message ? error?.message : customError }</p>
            <div className='d-flex justify-content-center' >
                <input className="bg-primary text-white rounded py-2 px-4 border-0" type="submit" id="submitBtn" value="Register" />
            </div>
            <p>Already have an account ? <Link className='no-decoration-text' to={'/signin'}> Sign In here</Link></p>
        </form>
    );
};

export default Signup;