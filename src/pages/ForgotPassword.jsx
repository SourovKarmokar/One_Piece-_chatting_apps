import React, { useState } from 'react'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import login from "../pages/Login"
import { Link } from 'react-router';

const ForgotPassword = () => {
    const [emailerr, setEmailerr] = useState("")
    const auth = getAuth();
    const [email, setEmail] = useState("")

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handelForgotPassword = () => {
        if (!email) {
      setEmailerr('Please enter your email address.');

    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailerr('Please enter a valid email address.');

      }
    }if(email){
        sendPasswordResetEmail(auth, email)
  .then(() => {
    console.log('send message ');
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
    }
        
    }
    

    return (
        <div className='bg-primary h-screen items-center '>
            <div className='flex justify-center items-center '>
                <div className='w-[500px] bg-white mt-[300px] p-5 rounded '>
                    <h2 className='font-primary font-bold text-2xl'>Forgot Password</h2>
                    <div className="relative w-[368px] mt-[20px] my-[34px] ">

                        <input


                            type="email"

                            id="floating_standard"
                            value={email}
                            onChange={handleEmail}
                            className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />

                        <label htmlFor="floating_standard"
                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Forgot Password</label>
                    </div>

                    <div className='my-5'>
                        <Link to="/login"

                        
                        className="font-secondary text-white py-[10px] px-4 bg-demo rounded-[86px] bg-primary "
                    >Back to Login</Link>
                    <button
                        onClick={handelForgotPassword}
                       
                        className="font-secondary text-white py-[10px] px-4 bg-demo rounded-[86px] ml-10 bg-primary cursor-pointer"
                    >Reset</button>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default ForgotPassword
