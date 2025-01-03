import React, { useEffect } from 'react';
import {onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user =useSelector(Store => Store.user);
    const handleSignOut = () => {
        signOut(auth).then(() => {
           
          }).catch((error) => {
            navigate("/error")
          });
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              const {uid, email, displayName,photoURL }= user;
              dispatch(addUser({uid:uid, email:email, displayName: displayName, photoURL: photoURL}));
              navigate("/browse");
              
            } else {
              dispatch(removeUser());
              navigate("/");
            }
        });
        //unsubscribes when component unmounts
        return () => unsubscribe();
    },[]);
       




    return (
        <div className="absolute p-4 w-screen flex justify-between bg-gradient-to-b from-black z-10">
            <div className="w-44">
                <img src={LOGO} alt="logo"/>
            </div>
           { user && (<div className="flex p-2">
                <img className="w-12 h-12" alt="usericon" src={user?.photoURL}/>
                <buttom onClick={handleSignOut} className = "p-2 font-bold text-white cursor-pointer">Sign out</buttom>
            </div>)}

        </div>
    );
}

export default Header;
