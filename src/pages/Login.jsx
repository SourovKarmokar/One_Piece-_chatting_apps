import React from 'react'
import { useState } from "react";
import login from "../assets/login.jpg"
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import google from "../assets/google.png"
import { getAuth, signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider  } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import { Link } from 'react-router';

const Login = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider()
  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")
  const [show, setShow] = useState("false")

  const [emailerr, setEmailerr] = useState("")

  const [passwordErr, setPasswordErr] = useState("")



  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr("")
  }


  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordErr("")
  }


  const handleRegistration = () => {
    if (!email) {
      setEmailerr('Please enter your email address.');

    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailerr('Please enter a valid email address.');

      }
    }
    if (!password) {
      setPasswordErr('Please enter your password.');
    } else {
      if (!/(?=.*[a-z])/.test(password)) {
        setPasswordErr("Password has at least one lowercase letter.")
      } else if (!/(?=.*[A-Z])/.test(password)) {
        setPasswordErr("Password must include a Uappercase letter.")
      } else if (!/(?=.*[0-9])/.test(password)) {
        setPasswordErr("Password must include at least one number.")
      } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
        setPasswordErr("Password must include at least one special character (!@#$%^&*).")
      } else if (!/(?=.{8,})/.test(password)) {
        setPasswordErr("Password must be at least 8 characters long.")
      }

    }
    {
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          console.log("User signed in:", user);
        })
        .catch((error) => {
          const errorCode = error.code;

          console.log("Error code:", errorCode);

          // if (errorCode.includes("auth/invalid-email")) {
          //   toast.error("Please give your right emial & password");

          // }



          // Handle specific Firebase errors
          if (errorCode === 'auth/invalid-email') {
            toast.error('Please give your right emial & password');
          }
        });
    }
  }


const handleGoogleSignIn = () => {
  signInWithPopup(auth, provider)
  .then((user) => {
    console.log(user);
    console.log("sussess");
    
    
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    console.log(errorCode);
    
  });
}


  return (
    <div className="flex">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}>
      </ToastContainer>
      <div className="w-[60%] pt-[100px] pl-[190px]">
        <h2 className="font-secondary font-bold text-secondary text-[34px]">Login to your account!</h2>
        <div onClick={handleGoogleSignIn} className='
                        relative
                        mt-9
                        w-[220.9px] h-[62.52px]
                        bg-opacity-88
                        rounded-lg
                        border border-[#03014C] border-opacity-88
                        flex items-center justify-center
                        cursor-pointer
                        hover:bg-opacity-100 transition-opacity'>
          <img src={google} alt="#google" />
          <h3 className="ml-2 flex items-center gap-2 text-gray-800 font-medium text-sm">
            Login with Google
          </h3>
        </div>
        <div className="xl:w-[368px]">

          <div className="relative my-[34px]">

            <input
            
             
              type="email"
            
              id="floating_standard"
              value={email}
              onChange={handleEmail}
              className="block py-2.5 px-0 w-full  xl:w-[368px] text-xl text-secondary font-semibold  border-gray-300 appearance-none bg-transparent border-0 border-b-2   focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />

            <label htmlFor="floating_standard"
              className="absolute text-sm text-secondary  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email Addres</label>
          </div>





          <div className="relative my-[34px]">
            <input
              value={password}
              type={show ? "password" : "Text"}
              onChange={handlePassword}
              id="floating_standard2" className=" mt-[60px] block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />


            {
              show ?
                <FaEyeSlash onClick={() => setShow(!show)} className="absolute top-4 right-7" /> :
                <FaEye onClick={() => setShow(!show)} className="absolute top-4 right-7" />

            }
            <p className="bg-red-500 text-black rounded px-4 mt-1">{passwordErr}</p>
            <label htmlFor="floating_standard2" className="absolute text-sm text-secondary  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Password</label>
          </div>

          <div className="w-[368px]">
            <button
              onClick={handleRegistration}
              style={{
                background: "linear-gradient(87deg, rgba(30,30,30,1) 0%, rgba(37,19,102,1) 54%, rgba(0,0,0,1) 100%)",
              }}
              className="w-full font-secondary text-white py-[20px] bg-demo rounded-[86px]"
            >Sign up</button>
            <p className="text-center text-[#03014C]font-sans text-[13px] mt-[35px]">Already  have an account ?
              <span className=" text-[#EA6C00] font-sans text-[13px] mt-[35px]">
                Sign In
              </span>
            </p>
            <div className='text-center ' >
              <Link to="/forgotpassword" className=" text-[#EA6C00] font-sans text-[13px] mt-[35px] font-bold">Forget Password ?</Link>
            </div>
          </div>
        </div>

      </div>
      <div className="w-[40%]">
        <img className="w-full h-screen object-cover" src={login}
          alt="#login" />
      </div>
    </div>
  )
}




export default Login
