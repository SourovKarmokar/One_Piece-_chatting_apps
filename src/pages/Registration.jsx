import React from 'react'
import { useState } from "react";
import registration from "../assets/registration.png"
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
const Registration = () => {
     const [ email , setEmail ] = useState("")
    const [ fullName , setFullName ] = useState("")
    const [password , setPassword ] = useState("")
    const [show , setShow ] = useState("false")

    const [emailerr , setEmailerr] = useState("")
    const [fullNameErr, SetFullNameErr] = useState("")
    const [passwordErr , setPasswordErr] =useState("")


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
      console.log(email);
      if(!email){
        setEmailerr('Please enter your email address.');
        
      }else{
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
          setEmailerr('Please enter a valid email address.');
          
        }
      }
      if(!fullName){
        SetFullNameErr('Please enter your full name.');
      }
      if(!password){
        setPasswordErr('Please enter your password.');
      }else{
         if(!/(?=.*[a-z])/.test(password)){
          setPasswordErr("Password has at least one lowercase letter.")
          }else if (!/(?=.*[A-Z])/.test(password)){
            setPasswordErr("Password must include a Uappercase letter.")
          }else if (!/(?=.*[0-9])/.test(password)){
            setPasswordErr("Password must include at least one number.")
          }else if(!/(?=.*[!@#$%^&*])/.test(password)){
            setPasswordErr("Password must include at least one special character (!@#$%^&*).")
          }else if (!/(?=.{8,})/.test(password)){
            setPasswordErr("Password must be at least 8 characters long.")
          }

      }
    }

    
    if(email && fullName && password &&  /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(
        password
      )
    ){
      console.log('registration done');
      setEmail("")
      setFullName("")
      setPassword("")
    }
  return (
     <div className="flex">
      <div className="w-[60%] pt-[100px] pl-[190px]">
        <h2 className="font-secondary font-bold text-secondary text-[34px]">Get started with easily register</h2>
        <p className="font-secondary text-[20px] text-black/50 mt-[13px]">Free register and you can enjoy it</p>

        <div className="xl:w-[368px]">

          <div class="relative my-[34px]">
            <input 
            onChange={handleEmail} 
            value={email}
            type="email" id="floating_outlined2" 
            className="block px-[26px] py-[26px]  text-xl w-full text-secondary font-semibold bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-secondary/30 peer" placeholder="  " />
            <p className="bg-red-500 text-white rounded px-4 mt-1">{emailerr}</p>
            <label for="floating_outlined2" className="absolute text-sm  duration-300 transform  -translate-y-4 top-2 z-10 origin-[0] bg-white  px-4 peer-focus:px-4 
            font-secondary font-semibold
            tracking-[2px] text-secondary
            peer-focus:text-secondary/70  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2  peer-focus:-translate-y-4 rtl:peer-focus:translate-x-2/5 rtl:peer-focus:left-auto start-4">Email Address</label>
          </div>


          <div class="relative my-[34px]">
            <input 
            onChange={handleFullname}
            value={fullName}
            type="text"   
            id="floating_outlined2" 
            className="block px-[26px] py-[26px] xl:w-[368px] text-xl text-secondary font-semibold bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-secondary/30 peer" placeholder="  " />

              <p className="bg-red-500 text-white rounded px-4 mt-1">{fullNameErr}</p>

            <label for="floating_outlined2" className="absolute text-sm  duration-300 transform  -translate-y-4 top-2 z-10 origin-[0] bg-white  px-4 peer-focus:px-4 
            font-secondary font-semibold
            tracking-[2px] text-secondary
            peer-focus:text-secondary/70  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2  peer-focus:-translate-y-4 rtl:peer-focus:translate-x-2/5 rtl:peer-focus:left-auto start-4">Full name</label>
          </div>


          <div class="relative my-[34px]">
            <input 
            value={password}
            type={show ? "password" :"Text"}
            onChange={handlePassword}
            id="floating_outlined2" 
            className="block px-[26px] py-[26px] xl:w-[368px] text-xl text-secondary font-semibold bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-secondary/30 peer" placeholder=" " />
            
           {
              show ? 
              <FaEyeSlash onClick={()=>setShow(!show)} className="absolute top-8 right-7"/>: 
              <FaEye onClick={()=>setShow(!show)} className="absolute top-8 right-7" />

            }
            <p className="bg-red-500 text-white rounded px-4 mt-1">{passwordErr}</p>
            <label for="floating_outlined2" className="absolute text-sm  duration-300 transform  -translate-y-4 top-2 z-10 origin-[0] bg-white  px-4 peer-focus:px-4 
            font-secondary font-semibold
            tracking-[2px] text-secondary
            peer-focus:text-secondary/70  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2  peer-focus:-translate-y-4 rtl:peer-focus:translate-x-2/5 rtl:peer-focus:left-auto start-4">Password</label>
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
          </div>
        </div>

      </div>
      <div className="w-[40%]">
        <img className="w-full h-screen object-cover" src={registration} alt="#registration" />
      </div>
    </div>
  )
}

export default Registration
