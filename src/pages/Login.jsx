import React from 'react'
import { useState } from "react";
import login from "../assets/login.jpg"
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
const Login = () => {
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
    


    if(email && fullName && password ){
      console.log('registration done');
      setEmail("")
      setPassword("")
    }
  

    
    
  return (
     <div className="flex">
      <div className="w-[60%] pt-[100px] pl-[190px]">
        <h2 className="font-secondary font-bold text-secondary text-[34px]">Login to your account!</h2>
        <p className="font-secondary text-[20px] text-black/50 mt-[13px]">Free register and you can enjoy it</p>

        <div className="xl:w-[368px]">

          <div class="relative my-[34px]">
            
            <input type="text" id="floating_standard" className="block py-2.5 px-0 w-full  xl:w-[368px] text-xl text-secondary font-semibold  border-gray-300 appearance-none bg-transparent border-0 border-b-2   focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label for="floating_standard" 
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email Addres</label>
          </div>


         


          <div class="relative my-[34px]">
            <input 
            value={password}
            type={show ? "password" :"Text"}
            onChange={handlePassword}
            id="floating_standard" className=" mt-[60px] block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />

            
           {
              show ? 
              <FaEyeSlash onClick={()=>setShow(!show)} className="absolute top-8 right-7"/>: 
              <FaEye onClick={()=>setShow(!show)} className="absolute top-8 right-7" />

            }
            <p className="bg-red-500 text-black rounded px-4 mt-1">{passwordErr}</p>
             <label for="floating_standard" className="absolute text-sm text-secondary  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Floating standard</label>
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
        <img className="w-full h-screen object-cover" src={login} 
        alt="#login" />
      </div>
    </div>
  )
}




export default Login
