import React from 'react';
import {signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from "../utils/firebase";
import { useSelector } from 'react-redux';

const Header = () => {
    const navigate = useNavigate();
    const user =useSelector(Store => Store.user);
    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate("/")
          }).catch((error) => {
            navigate("/error")
          });
    }
    return (
        <div className="absolute p-4 w-screen flex justify-between bg-gradient-to-b from-black z-10">
            <div className="w-44">
                <img src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo"/>
            </div>
           { user && (<div className="flex p-2">
                <img className="w-12 h-12" alt="usericon" src={user?.photoURL}/>
                <buttom onClick={handleSignOut} className = " font-bold text-white cursor-pointer">Sign out</buttom>
            </div>)}

        </div>
    );
}

export default Header;
