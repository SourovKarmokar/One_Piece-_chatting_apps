import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import profile from "../../assets/profile.png"
import { getDatabase, onValue, ref } from 'firebase/database';
import { useSelector } from 'react-redux';




const BlockUser = () => {
  const user = useSelector((state) => state.userLogInfo.value.user.uid)
  console.log(user);

  const db = getDatabase()

  const [blocklist, setBlocklist] = useState([])


  useEffect(() => {

    const blocklistRef = ref(db, 'blocklist/');
    onValue(blocklistRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if (data.uid === item.val().blockerid)

          arr.push(item.val())
      })
      setBlocklist(arr);
    });
  }, [])
  console.log(blocklist);




  return (


    <div className=" h-[300px]  pt-[20px] pl-[22px] pb-[70px] pr-[25px] rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] font-primary">
      <div className="flex items-center justify-between mb-[34px]">
        <h1 className="font-poppins font-semibold text-black text-[20px]">
          Blocked Users
        </h1>
        <BsThreeDotsVertical />
      </div>

      <div className=" overflow-y-auto h-[200px] pt-[10px]">


        {
          blocklist.map((item) => (
            <div className="mb-[20px]">
              <div className="flex h-[54px] justify-between border-b pb-[10px] border-black/25">
                <div className="flex items-center">
                  <div
                    className="relative w-[52px] h-[52px] rounded-full bg-cover bg-center mr-[10px]"

                  >
                    <img src={profile} alt="" />
                  </div>
                  <div className='ml-[10px]'>
                    <h2 className="font-primary font-semibold text-black text-[14px]">

                      {item.blockedName}
                    </h2>
                    <p className="font-primary font-medium text-[#4D4D4D] opacity-75 text-[12px]">
                      Today, 8:56pm
                    </p>
                  </div>
                </div>

                <div className="mr-[10px]">
                  <div className="flex bg-black rounded-[5px] justify-center items-center">
                    
                    
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

export default BlockUser
