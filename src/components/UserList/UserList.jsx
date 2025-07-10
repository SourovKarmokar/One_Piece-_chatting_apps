import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';

const UserList = () => {
  return (
    <div className='h-[451px] pt-[20px] pl-[22px] pb-[70px] pr-[25px] rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] font-primary'>
      <div className='flex items-center justify-between mb-[34px]'>
        <h1 className='font-poppins font-semibold text-black text-[20px]'>
          User List
        </h1>
        <BsThreeDotsVertical />
      </div>
    </div>
  )
}

export default UserList
