import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import user from "../../assets/user.png"
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from 'react-redux';

const GroupList = () => {
  const data = useSelector((state) => state.userLogInfo.value.user)
  const db = getDatabase()
  const [show, setShow] = useState(false);
  const [groupName, setGroupName] = useState('')
  const [groupNameErr, setGroupNameErr] = useState('')

  const [groupTagName, setGroupTagName] = useState("")
  const [groupTagNameErr, setGroupTagNameErr] = useState("")


  const handleGroupName = (e) => {
    setGroupName(e.target.value)

  }

  const hendleToggle = () => {
    console.log('ok');
    setShow(!show)
  }

  const handleCreateGroup = () => {
    if (!groupName) {
      setGroupNameErr("Please Give Group Name");
    }
    if (!groupTagName) {
      setGroupTagNameErr("Please Give Group Tag Name")
    }
    if (groupName && groupTagName) {
      set(push(ref(db, 'groups/' )), {
        groupName : groupName ,
        groupTagLine : groupTagName,
        groupAdminId : data.uid,
      });
    }

  }

  const handleGroupTagName = (e) => {
    setGroupTagName(e.target.value)
  }


    const [groupList, setGroupList] = useState([])
  useEffect(() => {
    const groupRef = ref(db, 'groups/');
    onValue(groupRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if(data.uid !== item.val().groupAdminId ){
          arr.push(item.val())
        }
      })
      setGroupList(arr)
    });

  }, [])



  return (
    <div className="w-[427px] h-[451px] pt-[20px] pl-[22px] pb-[70px] pr-[25px] rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] font-primary">
      <div className="flex items-center justify-between mb-[34px]">
        <h1 className="font-poppins font-semibold text-black text-[20px]">
          Group List
        </h1>
        {/* <BsThreeDotsVertical /> */}
        {
          show ?
            <button className='bg-red-300 text-primary rounded py-2 px-3  ' onClick={hendleToggle}>Go Back</button>

            :
            <button className='bg-primary text-white rounded py-2 px-3  ' onClick={hendleToggle}>Create Group</button>

        }

      </div>

      <div className=" overflow-y-auto h-[354px] pt-[10px]">
        {
          show ?
            <div>
              <input value={groupName} onChange={handleGroupName} className='border w-[300px] p-3 rounded-lg' type="text" placeholder='group name' />
              <p className='text-red-500'>{groupNameErr}</p>
              <input value={groupTagName} onChange={handleGroupTagName} className='border w-[300px] p-3 rounded-lg my-5 ' type="text" placeholder='group tag name' />
              <p className='text-red-500'>{groupTagNameErr}</p>
              <br />
              <button onClick={handleCreateGroup} className="bg-primary text-white rounded py-2 px-3">Submit</button>
            </div>
            :
            <div>
              {
                groupList.map((item) => (
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
                      {item.groupName}
                    </h2>
                    <p className="font-primary font-medium text-[#4D4D4D] opacity-75 text-[12px]">
                      {item.groupTagLine}
                    </p>
                  </div>
                </div>

                
              </div>
            </div>
                ) )
              }

            </div>
            
        }


      </div>
    </div>

  )
}

export default GroupList
