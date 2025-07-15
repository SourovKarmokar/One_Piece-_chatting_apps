import React from 'react'
import profile from "../../assets/profile.png"
import { MdOutlineHome } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { LuMessageCircleMore } from "react-icons/lu";
import { ImExit } from "react-icons/im";
import { getAuth , signOut } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { userLogInfo } from '../../slice/userSlice';

const Sidebar = () => {
  const data = useSelector(state => state.userLogInfo.value)
  console.log(data);
  
  const auth = getAuth();
  const navigate = useNavigate(null);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    signOut(auth).then(() => {
      dispatch(userLogInfo())
      localStorage.removeItem("userLoginInfo")
      setTimeout(() => {
        navigate("/login")
      },1000)
    }).catch((error) => {
      
    });

  }
  return (
    <div className='bg-primary h-screen  rounded-lg font-primary'>
      <div className='pt-[38px]'>
        <img className='mx-auto' src={profile} alt="" />
        <p className='text-white text-center '>{data.user.displayName}</p>
      </div>
      <div className="
                       relative mt-[78px] z-[1] py-[20px]
                       after:content-[''] after:absolute after:top-0 after:left-[20px]  after:w-full after:h-full after:bg-white after:rounded-2xl after:z-[-1]
                       before:content-[''] before:absolute before:top-0 before:right-0 before:w-[10px] before:h-full before:bg-primary before:rounded-l-2xl
                       before:shadow-lg
                      ">
        <MdOutlineHome size={60} className='mx-auto' />
      </div>
      <div className="mt-[57px] ">
        <LuMessageCircleMore size={60} className='mx-auto text-white' />
      </div>
      <div className="mt-[57px] ">
        <MdOutlineSettings size={60} className='mx-auto text-white' />
      </div>
      <div className="mt-[57px] ">
        <ImExit onClick={handleLogOut} size={60} className='mx-auto text-white' />
      </div>
    </div>
  )
}

export default Sidebar
