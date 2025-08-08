import React, { useEffect, useState } from 'react'
import profile from "../../assets/profile.png"
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { LiaSmsSolid } from "react-icons/lia";
import { getDatabase, onValue, push, ref, set } from 'firebase/database';

const ChatBox = () => {
  const db = getDatabase()
  const data = useSelector((state) => state.userLogInfo.value.user)
  const activeData = useSelector((state) => (state.activeInfo.value));
  console.log(data);
  

  const [msg , setMsg] = useState("")
  const [ msgList , setMsgList ] = useState([])
  
  

  const handleSendMsg = () => {
  if (msg.trim() === "") return;

  set(push(ref(db, "singleMsg/")), {
    whoSenderId: data.uid,
    whoSenderName: data.displayName,
    whoReceiverId: activeData.id,
    whoReceiverName: activeData.name,
    msg: msg,
    time: Date.now() // এখানে সঠিক টাইমস্ট্যাম্প
  });

  setMsg(""); // মেসেজ পাঠানোর পর ইনপুট ফাঁকা
};



   useEffect(() => {
    const singleMsgRef = ref(db, "singleMsg/");

    // Listener সেট করা
    const unsubscribe = onValue(singleMsgRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });
      setMsgList(arr);
    });

    // Cleanup - memory leak এড়াতে
    return () => unsubscribe();
  }, [db]);


  
  return (
  <div className='h-[700px] py-6 px-2 pb-[70px] pr-[25px] rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] font-primary ml-3 flex flex-col border-2 border-transparent'>

  {/* Header */}
  <div className='flex justify-between items-center border-b-2 py-3 border-black/25'>
    <div className='flex items-center'>
      <img src={profile} alt="Profile" />
      <div className='ml-[33px]'>
        <p className='text-2xl font-bold'>{activeData.name}</p>
        <p>Online</p>
      </div>
    </div>
    <div>
      <BsThreeDotsVertical />
    </div>
  </div>

  {/* Chat Messages */}
  <div className='py-10 flex-1 flex flex-col justify-end overflow-y-auto'>

    {
  msgList.map((item, index) => {
    const timeString = new Date(item.time).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    return item.whoSenderId === data.uid ? (
      // Sender Message
      <div key={index} className='text-end mb-5'>
        <p className='inline-block px-[20px] py-[10px] bg-primary text-white rounded-tl-[8px] rounded-tr-[6px] rounded-br-[8px] rounded-bl-[4px]'>
          {item.msg}
        </p>
        <span className="block text-xs text-gray-500 mt-1">{timeString}</span>
      </div>
    ) : (
      // Receiver Message
      <div key={index} className='text-start mb-5'>
        <p className='inline-block px-[20px] py-[10px] bg-[#F1F1F1] text-primary rounded-tl-[8px] rounded-tr-[6px] rounded-br-[8px] rounded-bl-[4px]'>
          {item.msg}
        </p>
        <span className="block text-xs text-gray-500 mt-1">{timeString}</span>
      </div>
    );
  })
}

    {/* Receiver Message */}
    {/* <div className='text-start mb-5'>
      <p className='w-[205px] h-[57px] px-[52px] py-[13px] bg-[#F1F1F1] text-primary inline-block rounded-tl-[8px] rounded-tr-[6px] rounded-br-[8px] rounded-bl-[4px]'>
        Hay There
      </p>
    </div> */}

    {/* Sender Message */}
    {/* <div className='text-end mb-5'>
      <p className='w-[205px] h-[57px] px-[52px] py-[13px] bg-primary text-white inline-block rounded-tl-[8px] rounded-tr-[6px] rounded-br-[8px] rounded-bl-[4px]'>
        Hay Sourov
      </p>
    </div> */}

  </div>

  {/* Input + Send Button */}
  <div className='mt-auto flex items-center gap-2'>
    <input
    value={msg} // state এর সাথে bind
      onChange={(e) => setMsg(e.target.value)}
      type="text"
      placeholder="Type a message"
      className='w-full h-[45px] bg-[#F1F1F1] rounded-[10px] opacity-100 focus:outline-none px-4'
    />
    <button onClick={handleSendMsg} className='w-[45px] h-[45px] bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition'>
      <LiaSmsSolid className='text-xl' />
    </button>
  </div>

</div>


  )
}

export default ChatBox
