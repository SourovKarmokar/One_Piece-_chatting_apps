import React from 'react'
import { useState } from "react";
import registration from "../assets/registration.png"
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Link, useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { Bars } from 'react-loader-spinner'
import { getDatabase, ref, set } from "firebase/database";

// import {ThreeCircles} from 'react-loader-spinner'




const Registration = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState("false")
  const [test, setTest] = useState(" ")
  const [emailerr, setEmailerr] = useState("")
  const [fullNameErr, SetFullNameErr] = useState("")
  const [passwordErr, setPasswordErr] = useState("")
  const [lodder, setLodder] = useState(false)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)


  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr("")
  }


  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordErr("")
  }

  const handleFullname = (e) => {
    setFullName(e.target.value)
    SetFullNameErr("")
  }


  const handleRegistration = () => {
    if (!email) {
      setEmailerr('Please enter your email address.');

    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailerr('Please enter a valid email address.');

      }
    }
    if (!fullName) {
      SetFullNameErr('Please enter your full name.');
    }
    if (!password) {
      setPasswordErr('Please enter your password.');
    }
    else {
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
    setLoading(true);
    if (email && fullName && password && /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/.test(password)) {
      setLoading(true)
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          sendEmailVerification(auth.currentUser)
          toast.success("Registration done. Please verify your email.");

          setLoading(false)
          setTimeout(() => {
            navigate("/login")
          }, 5000);
          setEmail("");
          setFullName("");
          setPassword("");
          setLoading(false)
        }).then(() => {
          set(ref(db, 'users/' + userId), {
            username: "name",
            email: " ",
            profile_picture: imageUrl
          });
        })
        .catch((error) => {


          const err = error.message
          if (err.includes("auth/email-already-in-use")) {
            setEmailerr('email already existe');

          } if (error.code === "auth/weak-password") {
            setPasswordErr("Password should be at least 6 characters.");
          }
          console.log("auth err :" + error);
          setLoading(false)

          console.log(error);

        });
      // console.log('registration done');

    }
  };




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
        <h2 className="font-secondary font-bold text-secondary text-[34px]">Get started with easily register</h2>
        <p className="font-secondary text-[20px] text-black/50 mt-[13px]">Free register and you can enjoy it</p>

        <div className="xl:w-[368px]">

          <form >
            <div className="relative my-[34px]">
              <input
                onChange={handleEmail}
                value={email}
                type="email" id="floating"
                className="block px-[26px] py-[26px]  text-xl w-full text-secondary font-semibold bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-secondary/30 peer" placeholder="  " />
              <p className="bg-red-500 text-white rounded px-4 mt-1">{emailerr}</p>
              <label htmlFor="floating" className="absolute text-sm  duration-300 transform  -translate-y-4 top-2 z-10 origin-[0] bg-white  px-4 peer-focus:px-4 
            font-secondary font-semibold
            tracking-[2px] text-secondary
            peer-focus:text-secondary/70  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2  peer-focus:-translate-y-4 rtl:peer-focus:translate-x-2/5 rtl:peer-focus:left-auto start-4">Email Address</label>
            </div>


            <div className="relative my-[34px]">
              <input
                onChange={handleFullname}
                value={fullName}
                type="text"
                id="floating_outlined"
                className="block px-[26px] py-[26px] xl:w-[368px] text-xl text-secondary font-semibold bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-secondary/30 peer" placeholder="  " />

              <p className="bg-red-500 text-white rounded px-4 mt-1">{fullNameErr}</p>

              <label htmlFor="floating_outlined" className="absolute text-sm  duration-300 transform  -translate-y-4 top-2 z-10 origin-[0] bg-white  px-4 peer-focus:px-4 
            font-secondary font-semibold
            tracking-[2px] text-secondary
            peer-focus:text-secondary/70  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2  peer-focus:-translate-y-4 rtl:peer-focus:translate-x-2/5 rtl:peer-focus:left-auto start-4">Full name</label>
            </div>


            <div className="relative my-[34px]">
              <input
                value={password}
                type={show ? "password" : "Text"}
                onChange={handlePassword}
                id="floating_outlined2"
                className="block px-[26px] py-[26px] xl:w-[368px] text-xl text-secondary font-semibold bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-secondary/30 peer" placeholder=" " />

              {
                show ?
                  <FaEyeSlash onClick={() => setShow(!show)} className="absolute top-8 right-7" /> :
                  <FaEye onClick={() => setShow(!show)} className="absolute top-8 right-7" />

              }
              <p className="bg-red-500 text-white rounded px-4 mt-1">{passwordErr}</p>
              <label htmlFor="floating_outlined2" className="absolute text-sm  duration-300 transform  -translate-y-4 top-2 z-10 origin-[0] bg-white  px-4 peer-focus:px-4 
            font-secondary font-semibold
            tracking-[2px] text-secondary
            peer-focus:text-secondary/70  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2  peer-focus:-translate-y-4 rtl:peer-focus:translate-x-2/5 rtl:peer-focus:left-auto start-4">Password</label>
            </div>

            <div className="w-[368px]">
              {
                loading ?
                  <div className="flex items-center justify-center ">
                    <Bars
                      height="80"
                      width="80"
                      color="#4fa94d"
                      ariaLabel="bars-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  </div>


                  :
                  <button
                    onClick={handleRegistration}
                    style={{
                      background: "linear-gradient(87deg, rgba(30,30,30,1) 0%, rgba(37,19,102,1) 54%, rgba(0,0,0,1) 100%)",
                    }}
                    className="w-full font-secondary text-white py-[20px] bg-demo rounded-[86px]"
                  >Sign Up</button>
              }
              {/* <button
              onClick={handleRegistration}
              style={{
                background: "linear-gradient(87deg, rgba(30,30,30,1) 0%, rgba(37,19,102,1) 54%, rgba(0,0,0,1) 100%)",
              }}
              className="w-full font-secondary text-white py-[20px] bg-demo rounded-[86px]"
            >Sign Up</button> */}
              <div>
                {/* {loading ? <ThreeCircles color="white" /> : "Sign Up"} */}

                {/* render(<ThreeCircles
                visible={true}
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />) */}


              </div>
              <p className="text-center text-[#03014C]font-sans text-[13px] mt-[35px]">Already  have an account ?
                <span className=" text-[#EA6C00] font-sans text-[13px] mt-[35px]">
                  <Link to="/login">
                    Sign In
                  </Link>
                </span>
              </p>
            </div>
          </form>
        </div>

      </div>
      <div className="w-[40%]">
        <img className="w-full h-screen object-cover" src={registration} alt="#registration" />
      </div>
    </div>
  )
}

export default Registration
