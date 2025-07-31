import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import user from "../../assets/user.png"
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Friends = () => {
  const data = useSelector(state => state.userLogInfo.value.user);
  const db = getDatabase();

  const [friendList, setFriendList] = useState([])
  useEffect(() => {
    const friendRef = ref(db, 'friend/');
    onValue(friendRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if (data.uid == item.val().receiverid ||
          data.uid == item.val().senderid) {

          arr.push({...item.val(), id: item.key});
        }


      })
      setFriendList(arr);
    });
  }, [])
  console.log(friendList, "friendList");


  // const hendleBlock = () => {
  //   set(push(ref(db, 'block/' )), {
  //           groupName : groupName ,
  //           groupTagLine : groupTagName,
  //           groupAdminId : data.uid,
  //         });
  // }


  const blockHandler = (friend) => {
    let blockerId = "";
    let blockedId = "";
    let blockerName = "";
    let blockedName = "";
    if (friend.senderid == data.uid) {
      blockerId = friend.senderid;
      blockerName = friend.sendername;
      blockedId = friend.receiverid;
      blockedName = friend.receivername;
    } else {
      blockerId = friend.receiverid;
      blockerName = friend.receivername;
      blockedId = friend.senderid;
      blockedName = friend.sendername;
    }
    set(push(ref(db, "blocklist/")), {
      blockerId: blockerId,
      blockedId: blockedId,
      blockerName: blockerName,
      blockedName: blockedName,
    });
    set(push(ref(db, "notification/")), {
      notifyReciver: blockedId,
      type: "negative",
      // time: time(),
      content: `${blockerName} blocked you`,
    });
    toast.success("Blocked Successful");
    remove(ref(db, "friend/" + friend.id));
    console.log(friend);
    
  };

  return (
    <div className="w-[344px] h-[451px] pt-[20px] pl-[22px] pb-[70px] pr-[25px] rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] font-primary">
      <div className="flex items-center justify-between mb-[34px]">
        <h1 className="font-poppins font-semibold text-black text-[20px]">
          Friends
        </h1>
        <BsThreeDotsVertical />
      </div>

      <div className=" overflow-y-auto h-[354px] pt-[10px]">

        {
          friendList.map((item) => (
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

                      {
                        data.uid == item.senderid ? item.receivername : item.sendername
                      }
                    </h2>
                    <p className="font-primary font-medium text-[#4D4D4D] opacity-75 text-[12px]">
                      Today, 8:56pm
                    </p>
                  </div>
                </div>

                <div className="mr-[10px]">
                  <div className="flex bg-black rounded-[5px] justify-center items-center">
                    <button onClick={() => blockHandler(item)} className='text-white p-2'>Block</button>
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

export default Friends
