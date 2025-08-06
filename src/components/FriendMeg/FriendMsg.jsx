import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import user from "../../assets/profile.png"
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { activeMsgInfo } from '../../slice/activeMsgSlice';


const FriendMsg = () => {
  const data = useSelector(state => state.userLogInfo.value.user);
  const dispatch = useDispatch()
  const db = getDatabase();

  const [friendList, setFriendList] = useState([])

  useEffect(() => {
    const friendRef = ref(db, 'friend/');
    onValue(friendRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if (data.uid === item.val().receiverid || data.uid === item.val().senderid) {
          arr.push({ ...item.val(), id: item.key });
        }
      })
      setFriendList(arr);
    });
  }, [])

  const handleMsg = (item) => {
    console.log("Message clicked for:", item);
    dispatch(activeMsgInfo(item))
  }

  return (
    <div className=" h-[500px] pt-[20px] pl-[22px] pb-[70px] pr-[25px] rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] font-primary">
      <div className="flex items-center justify-between mb-[34px]">
        <h1 className="font-poppins font-semibold text-black text-[20px]">Friends</h1>
        <BsThreeDotsVertical />
      </div>

      <input
        className='border pl-[66px] py-[18px] border-b-4 border-[#000000]/0.25 w-full h[59px] rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] mb-[5px] focus:outline-none focus:ring-blue-400'
        type="text"
        placeholder='search'
      />

      <div className="overflow-y-auto h-[250px] pt-[10px]">
        {
          friendList.map((item) => (
            <div key={item.id} className="mb-[20px]">
              <div className="flex h-[54px] justify-between border-b pb-[10px] border-black/25">
                <div className="flex items-center">
                  <div className="relative w-[52px] h-[52px] rounded-full bg-cover bg-center mr-[10px]">
                    <img src={user} alt="" />
                  </div>
                  <div className='ml-[10px]'>
                    <h2 className="font-primary font-semibold text-black text-[14px]">
                      {data.uid === item.senderid ? item.receivername : item.sendername}
                    </h2>
                    <p className="font-primary font-medium text-[#4D4D4D] opacity-75 text-[12px]">
                      Today, 8:56pm
                    </p>
                  </div>
                </div>

                <div className="mr-[10px]">
                  <div className="flex bg-black rounded-[5px] justify-center items-center">
                    <button onClick={() => handleMsg(item)} className='text-white p-2'>Message</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default FriendMsg;





