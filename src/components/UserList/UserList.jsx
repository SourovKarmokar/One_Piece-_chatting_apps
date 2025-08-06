import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import user from "../../assets/user.png"
import { getDatabase, ref, onValue, set, push , } from "firebase/database";
import { useSelector } from 'react-redux';

const UserList = () => {
 const data = useSelector(state => state.userLogInfo.value.user);
  console.log(data, 'data');
  const [friendRequestList, setFriendRequestList] = useState([])

  const db = getDatabase();
  const [userList, setUserList] = useState([])
  const [friendList, setFriendList] = useState([])


  const [blocklist , setBlocklist ] = useState([])
  
  
   useEffect(() => {
        
        const blocklistRef = ref(db, 'blocklist/');
        onValue(blocklistRef, (snapshot) => {
          let arr = []
          snapshot.forEach((item) => {
            arr.push(item.val())
          })
          setBlocklist(arr);
        });
      }, [])
  console.log(blocklist);




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
      setUserList(arr)
    });
  }, [])

  console.log(userList, "user");
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

    const [filterUser , setFilterUser ] = useState([])
  const hendleSearch = (e) => {
    let arr =  []
    if(e.target.value.length == 0){
      setFilterUser([])
    }else{
      userList.filter((item) => {
      if(item.username.toLowerCase().includes(e.target.value.toLowerCase())){
        arr.push(item)
        setFilterUser(arr)
      } 
    }
    )
    }
    
  }

  return (
    <div className="h-[300px]   pt-[20px] pl-[20px] pb-[70px] pr-[10px] rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] font-primary">
      <div className="flex items-center justify-between ">
        <h1 className="font-poppins font-semibold text-black text-[20px]">
          User List
        </h1>
        <BsThreeDotsVertical />
      </div>

      <input onChange={hendleSearch} className='border pl-[66px] py-[18px] border-b-4 border-[#000000]/0.25 w-full h[59px] rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] mb-[5px] focus:outline-none focus:ring-blue-400' type="text" placeholder='search' />

      <div className=" overflow-y-auto h-[150px] pt-[10px]">

        {
          filterUser.length > 0
          ?
          filterUser.map((item) => (
            <div className="mb-[20px]">
              <div className="flex h-[54px] justify-between border-b pb-[10px] border-black/25">
                <div className="flex items-center">
                  <div
                    className="relative w-[52px] h-[52px] rounded-full bg-cover bg-center mr-[10px]"

                  >
                    <img src={user} alt="" />
                  </div>
                  <div className='ml-[5px]'>
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
          :
          userList.map((item) => (
            <div className="mb-[20px]">
              <div className="flex h-[54px] justify-between border-b pb-[10px] border-black/25">
                <div className="flex items-center">
                  <div
                    className="relative w-[52px] h-[52px] rounded-full bg-cover bg-center mr-[10px]"

                  >
                    <img src={user} alt="" />
                  </div>
                  <div className='ml-[5px]'>
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