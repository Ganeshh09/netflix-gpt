import { useState, useRef } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constants';

const Login = () => {
    const [IsSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [rememberMe, setRememberMe] = useState(false); // State to track "Remember me" checkbox
 
    const dispatch = useDispatch();

    
    const email = useRef(null);
    const password = useRef(null);
    const username = useRef(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!IsSignInForm);
        setErrorMessage(null); // Clear error messages when switching forms
    };

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe); // Toggle "Remember me" checkbox state
    };

    const handleButtonClick = () => {
        if (email.current && password.current) {
            const emailValue = email.current.value;
            const passwordValue = password.current.value;
            const usernameValue = username.current ? username.current.value : '';

            const message = checkValidData(emailValue, passwordValue, IsSignInForm ? null : usernameValue);
            setErrorMessage(message);
            if (message) return;

            if (!IsSignInForm) {
                createUserWithEmailAndPassword(auth, emailValue, passwordValue)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        updateProfile(user, {
                            displayName: username.current.value, photoURL:USER_AVATAR,
                            
                          })
                            .then(() => {
                                const {uid, email, displayName,photoURL }= auth.currentUser;
                                dispatch(
                                    addUser({
                                        uid:uid, 
                                        email:email, 
                                        displayName: displayName, 
                                        photoURL: photoURL,
                                    })
                                );
                            

                            })
                            .catch((error) => {
                                setErrorMessage(error.message);
                          });
                      
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        setErrorMessage(errorCode + " - " + errorMessage);
                    });
            } else {
                signInWithEmailAndPassword(auth, emailValue, passwordValue)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        
              
                       
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        setErrorMessage(errorCode + " - " + errorMessage);
                    });
            }
        } else {
            setErrorMessage("Please fill in all required fields.");
        }
    };

    return (
        <div>
            <Header />
            <div className="absolute bg-gradient-to-b from-black">
                <img
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/151f3e1e-b2c9-4626-afcd-6b39d0b2694f/web/IN-en-20241028-TRIFECTA-perspective_bce9a321-39cb-4cce-8ba6-02dab4c72e53_large.jpg"
                    alt="backgroundimage"
                />
            </div>
            <div className="absolute bg-black text-white w-4/12 my-36 mx-auto right-0 left-0 top-0 rounded-md bg-[rgba(0,0,0,0.8)] p-4 opacity-85">
                <form onSubmit={(e) => e.preventDefault()} className="">
                    <p className="text-3xl mt-12 p-2 pb-4 ml-14 font-bold text-white">
                        {IsSignInForm ? "Sign In" : "Sign Up"}
                    </p>
                    {!IsSignInForm && (
                        <input
                            ref={username}
                            type="text"
                            placeholder="Username"
                            className="my-2 text-white w-8/12 ml-16 bg-transparent border-[1px] rounded-[4px]  border-gray-500 p-4 "
                        />
                    )}
                    <input
                        ref={email}
                        type="email"
                        placeholder="Email Address"
                        className="my-2 text-white w-8/12 ml-16 bg-transparent border-[1px] rounded-[4px]  border-gray-500 p-4 "
                    />
                    <input
                        ref={password}
                        type="password"
                        placeholder="Password"
                        className="my-2 text-white w-8/12 ml-16 bg-transparent border-[1px] rounded-[4px]  border-gray-500 p-4"
                    />
                    <p className="text-red-600">{errorMessage}</p>
                    <button
                        className="bg-red-600 my-4 p-2 w-8/12 ml-16 rounded-md text-white shadow-glow font-semibold"
                        onClick={handleButtonClick}
                    >
                        {IsSignInForm ? "Sign In" : "Sign Up"}
                    </button>
                    <br />
                    <div>
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={handleRememberMeChange}
                            className="ml-16 my-2 p-4"
                        />
                        <label className="ml-2">Remember me</label>
                    </div>
                    <p
                        className="ml-12 p-4 cursor-pointer"
                        onClick={toggleSignInForm}
                    >
                        {IsSignInForm
                            ? "New to Netflix? Sign up now."
                            : "Already have an account?"}
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
