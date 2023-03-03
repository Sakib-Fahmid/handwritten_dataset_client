import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import app from '../../firebase.init';

const auth = getAuth(app)

const Navbar = () => {
    const [user] = useAuthState(auth);
    const [signOut, loading, error] = useSignOut(auth);

    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut();
        navigate('/signin');
        alert("You are signed out !");
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Welcome to Handwriting Dataset Survey </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/data-entry">Data Entry</Link>
                            </li>
                            <li className="nav-item">
                                {
                                    user ? <Link onClick={handleSignOut} className="nav-link" >Logout</Link> :
                                        <Link className="nav-link" to="/signin">Login</Link>
                                }

                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;