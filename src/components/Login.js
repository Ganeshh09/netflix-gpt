// Login.js
import { useState } from 'react';
import Header from './Header';

const Login = () => {

    const [IsSignInForm , setIsSignInForm] = useState(true);

    const toggleSignInForm = () => {
        setIsSignInForm(!IsSignInForm)   
    }







    return (

        <div> 
            <Header />
            <div className="absolute  bg-gradient-to-b from-black">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/151f3e1e-b2c9-4626-afcd-6b39d0b2694f/web/IN-en-20241028-TRIFECTA-perspective_bce9a321-39cb-4cce-8ba6-02dab4c72e53_large.jpg" alt="backgroundimage"/>
            </div>
            <div className= " absolute bg-black  text-white w-4/12 my-36 mx-auto right-0 left-0 top-0  rounded-md bg-[rgba(0,0,0,0.8)] p-4 opacity-85">
                <form className=' '>
                    <p className='text-3xl mt-12 p-2 pb-4 ml-14 font-bold text-white'>{IsSignInForm ? "Sign In" : "Sign Up"}</p>
                    { !IsSignInForm && <input type="text" placeholder="Username" className="my-2 text-white  w-8/12 ml-16 bg-transparent border-[1px] rounded-[4px]  border-gray-500 p-4 "/>} 
                    <input type="email" placeholder="Emial Address" className="my-2 text-white  w-8/12 ml-16 bg-transparent border-[1px] rounded-[4px]  border-gray-500 p-4 "/>
                    <input type="password" placeholder="Password" className="my-2 text-white w-8/12 ml-16 bg-transparent border-[1px] rounded-[4px]  border-gray-500 p-4"/>
                    <button className='bg-red-600 my-4 p-2  w-8/12  ml-16 rounded-md text-white shadow-glow font-semibold'>{IsSignInForm ? "Sign In" : "Sign Up"}</button><br/>
                    <input  className =" ml-16 my-2 p-4" type="checkbox"/><label className ="ml-2">Remember me</label>
                    <p className='ml-12 p-4 cursor-pointer' onClick = {toggleSignInForm}> {IsSignInForm ? "New to Netflix? Sign up now." : "Already created an Account"}</p>
                </form>
             </div>
        </div>
         
        
    );
}

export default Login;
