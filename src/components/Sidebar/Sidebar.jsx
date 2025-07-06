import React from 'react'
import profile from "../../assets/profile.png"
import { MdOutlineHome } from "react-icons/md";

const Sidebar = () => {
  return (
    <div  className='bg-primary h-screen  rounded-lg '>
      <div className='pt-[38px]'>
        <img className='mx-auto' src={profile} alt="" />
      </div>
      <div className='relative mt-[78px] left-[10px] after:content-[""] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-white after:z-[-1] z-[1]'>
        <MdOutlineHome size={60} className='mx-auto'/>
      </div>
    </div>
  )
}

export default Sidebar
