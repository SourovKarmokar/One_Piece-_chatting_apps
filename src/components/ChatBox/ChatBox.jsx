import React from 'react'
import profile from "../../assets/profile.png"
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs'
import { useSelector } from 'react-redux'

const ChatBox = () => {
  const data = useSelector((state) => (state.activeInfo.value));


  
  return (
    <div className='border-2 py-6 px-2 rounded-lg font-primary'>
      <div className='flex justify-between items-center '>
        <div className='flex items-center'>
            <img src={profile} alt="" />
            <div className='ml-[33px]'>
                <p className='text-2xl font-bold '>{data.receivername}</p>
                <p>Online</p>
            </div>
        </div>
        <div>
            <BsThreeDotsVertical />
        </div>
      </div>
    </div>
  )
}

export default ChatBox
