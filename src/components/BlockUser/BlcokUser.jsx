import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import user from "../../assets/user.png"

const BlockUser = () => {
  return (
    <div className="w-[344px] h-[451px] pt-[20px] pl-[22px] pb-[70px] pr-[25px] rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] font-primary">
      <div className="flex items-center justify-between mb-[34px]">
        <h1 className="font-poppins font-semibold text-black text-[20px]">
          Blocked Users
        </h1>
        <BsThreeDotsVertical />
      </div>

      <div className=" overflow-y-auto h-[354px] pt-[10px]">


        <div className="mb-[20px]">
          <div className="flex h-[54px] justify-between border-b pb-[10px] border-black/25">
            <div className="flex items-center">
              <div
                className="relative w-[52px] h-[52px] rounded-full bg-cover bg-center mr-[10px]"

              >
                <img src={user} alt="" />
              </div>
              <div className='ml-[10px]'>
                <h2 className="font-primary font-semibold text-black text-[14px]">
                  Swath Raham
                </h2>
                <p className="font-primary font-medium text-[#4D4D4D] opacity-75 text-[12px]">
                  Today, 8:56pm
                </p>
              </div>
            </div>

            <div className="mr-[10px]">
              <div className="flex size-[30px] bg-black rounded-[5px] justify-center items-center">
                <FaPlus className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default BlockUser
