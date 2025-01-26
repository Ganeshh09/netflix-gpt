import { useEffect } from 'react';
import {onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANG } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showGptSearch = useSelector((store)=> store.gpt.showGptSearch)
    const user =useSelector(Store => Store.user);
    const handleSignOut = () => {
        signOut(auth).then(() => {
           
          }).catch((error) => {
            navigate("/error");
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
     
    const handleGptSearch = (state) =>{
      dispatch(toggleGptSearchView());
    };
    const handleLanguageChange = (e) => {
      dispatch(changeLanguage(e.target.value))
    }




    return (
        <div className="absolute top-0 left-0 p-4 w-screen flex justify-between bg-gradient-to-b from-black z-10">
            <div className="w-44">
                <img src={LOGO} alt="logo"/>
            </div>
           { user && (<div className="flex p-2">
               {showGptSearch &&  (<select className="p-2 m-2 bg-gray-800 text-white " onChange={handleLanguageChange}>{SUPPORTED_LANG.map(lang =><option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}</select>)}
                <button onClick={handleGptSearch} className="py-2 text-white bg-orange-600 rounded-md m-2 p-4">{showGptSearch ?"Homepage":"GPT Search" }</button>
                <img className="w-12 h-12" alt="usericon" src={user?.photoURL}/>
                <button onClick={handleSignOut} className="p-2 ml-1 mr-2 mt-2 mb-2 font-bold text-white rounded cursor-pointer transition duration-200 hover:bg-white hover:text-black"> Sign out</button>
            </div>)}

        </div>
    );
}

export default Header;
