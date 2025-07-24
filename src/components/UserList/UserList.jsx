import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import user from "../../assets/user.png"
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux';

const UserList = () => {
  const data = useSelector(state => state.userLogInfo.value.user)
  console.log(data, 'data');
  const [friendRequestList, setFriendRequestList] = useState([])

  const db = getDatabase();
  const [useList, setUseList] = useState([])
  const [friendList, setFriendList] = useState([])


  useEffect(() => {
    const userRef = ref(db, 'users/');
    onValue(userRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        console.log(item.key, "value");
        if (data.uid !== item.key) {

          arr.push({ ...item.val(), userid: item.key });
        }

      })
      setUseList(arr)
    });
  }, [])

  console.log(useList, "user");
  const handleRequest = (item) => {
    set(push(ref(db, 'friendRequest/')), {
      senderid: data.uid,
      sendername: data.displayName,
      receiverid: item.userid,
      receivername: item.username,
    });

  }

  console.log(friendRequestList);




  useEffect(() => {

    const friendRequestRef = ref(db, 'friendRequest/');
    onValue(friendRequestRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        arr.push(item.val().receiverid + item.val().senderid);

      })
      setFriendRequestList(arr);
    });
  }, [])



  useEffect(() => {
    const friendRef = ref(db, 'friend/');
    onValue(friendRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        {

          arr.push(item.val().receiverid + item.val().senderid);
        }


      })
      setFriendList(arr);
    });
  }, [])






  return (
    <div className="w-[380px] h-[451px] pt-[20px] pl-[22px] pb-[70px] pr-[25px] rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] font-primary">
      <div className="flex items-center justify-between mb-[34px]">
        <h1 className="font-poppins font-semibold text-black text-[20px]">
          User List
        </h1>
        <BsThreeDotsVertical />
      </div>

      <div className=" overflow-y-auto h-[354px] pt-[10px]">
        {
          useList.map((item) => (
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
                      {item.username}
                    </h2>
                    <p className="font-primary font-medium text-[#4D4D4D] opacity-75 text-[12px]">
                      {item.email}
                    </p>
                  </div>
                </div>

                <div className="mr-[10px]">

                  {
                    friendList.includes(data.uid + item.userid) ||
                      friendList.includes(item.userid + data.uid)
                      ?
                      <div className="flex  bg-black rounded-[5px] justify-center items-center">

                        <p

                          className='text-white p-2 cursor-pointer'
                        >
                          Friend
                        </p>

                      </div>
                      :
                      friendRequestList.includes(data.uid + item.userid) ||
                        friendRequestList.includes(item.userid + data.uid)
                        ?
                        <div className="flex bg-black rounded-[5px] justify-center items-center">

                          <p

                            className='text-white p-2 cursor-pointer'
                          >
                            -
                          </p>

                        </div>
                        :
                        <div className="flex bg-black rounded-[5px] justify-center items-center">

                          <p
                            onClick={() => handleRequest(item)}
                            className='text-white p-2 cursor-pointer'
                          >
                            +
                          </p>

                        </div>
                  }



                </div>
              </div>
            </div>
          ))
        }



      </div>
    </div>

  )
}

export default UserList
