import React, { useEffect, useRef, useState } from 'react';
import profile from "../../assets/profile.png";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { LiaSmsSolid } from "react-icons/lia";
import { getDatabase, onValue, push, ref, set } from 'firebase/database';
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from 'emoji-picker-react';
import moment from 'moment/moment';

const ChatBox = () => {
  const db = getDatabase();

  // Redux থেকে লগইন ইউজারের ডাটা আনা
  const data = useSelector((state) => state.userLogInfo.value.user);

  // Redux থেকে অ্যাক্টিভ চ্যাট ইউজারের ডাটা আনা
  const activeData = useSelector((state) => state.activeInfo.value);

  const [msg, setMsg] = useState("");       // নতুন মেসেজ ইনপুট রাখার state
  const [msgList, setMsgList] = useState([]); // সব মেসেজ রাখার state
  const [showEmoji , setShowEmoji ] = useState(false)

  const chatEndRef = useRef(null); // চ্যাটের নিচের div-এর রেফারেন্স

  // মেসেজ পাঠানোর ফাংশন
  const handleSendMsg = () => {
    if (msg.trim() === "") return; // ফাঁকা মেসেজ হলে কিছু হবে না

    // Firebase-এ মেসেজ পাঠানো
    set(push(ref(db, "singleMsg/")), {
      whoSenderId: data.uid,
      whoSenderName: data.displayName,
      whoReceiverId: activeData.id,
      whoReceiverName: activeData.name,
      msg: msg,
      time: moment().format(),   // বর্তমান সময়
    });

    setMsg(""); // পাঠানোর পর ইনপুট ফাঁকা করে দেওয়া
  };

  // Firebase থেকে মেসেজ আনা
  useEffect(() => {
    const singleMsgRef = ref(db, "singleMsg/");

    const unsubscribe = onValue(singleMsgRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        const msgData = item.val();

        // শর্ত: sender=আমি আর receiver=অ্যাক্টিভ ইউজার || sender=অ্যাক্টিভ ইউজার আর receiver=আমি
        if (
          (data.uid === msgData.whoSenderId && activeData.id === msgData.whoReceiverId) ||
          (data.uid === msgData.whoReceiverId && activeData.id === msgData.whoSenderId)
        ) {
          arr.push(msgData);
        }
      });
      setMsgList(arr); // state আপডেট
    });

    return () => unsubscribe(); // লিসেনার বন্ধ
  }, [db, data.uid, activeData.id]);

  // চ্যাটের নিচে স্ক্রল করার ফাংশন
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // যখনই msgList পরিবর্তন হবে, নিচে স্ক্রল করবে
  useEffect(() => {
    scrollToBottom();
  }, [msgList]);

  const handleEmoji = (emoji) => {
    console.log('ok' , emoji.emoji);
    setMsg(msg + emoji.emoji)
  }

  const handlePressEnter = (e) => {
    if(e.key == "Enter"){
      handleSendMsg()
    }
    
  }

  return (
    <div className='h-[700px] py-6 px-2 pb-[70px] pr-[25px] rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] font-primary ml-3 flex flex-col border-2 border-transparent overflow-y-auto '>

      {/* উপরের হেডার */}
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

      {/* মেসেজ এরিয়া */}
      <div className='py-10 flex-1 flex flex-col justify-end overflow-y-auto'>
        {
          msgList.map((item, index) => {
            const timeString = new Date(item.time).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            });

            return item.whoSenderId === data.uid ? (
              // আমি পাঠিয়েছি
              <div key={index} className='text-end mb-5'>
                <p className='inline-block px-[20px] py-[10px] bg-primary text-white rounded-tl-[8px] rounded-tr-[6px] rounded-br-[8px] rounded-bl-[4px]'>
                  {item.msg}
                </p>
                <span className="block text-xs text-gray-500 mt-1">{moment().startOf('day').fromNow()}</span>
              </div>
            ) : (
              // অপরজন পাঠিয়েছে
              <div key={index} className='text-start mb-5'>
                <p className='inline-block px-[20px] py-[10px] bg-[#F1F1F1] text-primary rounded-tl-[8px] rounded-tr-[6px] rounded-br-[8px] rounded-bl-[4px]'>
                  {item.msg}
                </p>
                <span className="block text-xs text-gray-500 mt-1">{timeString}</span>
              </div>
            );
          })
        }

        {/* স্ক্রল টার্গেট */}
        <div ref={chatEndRef} />
      </div>
      {
        showEmoji && 
      <EmojiPicker onEmojiClick={handleEmoji} className='absolute bottom-[60px] left-[100px] ' />
      }

      {/* নিচের ইনপুট বক্স + সেন্ড বাটন */}
      <div className='mt-auto flex items-center gap-3'>
        {/* ইনপুট + ইমোজি */}
        <div className="flex items-center flex-1 bg-[#F1F1F1] rounded-[25px] px-4 py-2">
          <input
            value={msg}
            onKeyDown={handlePressEnter}
            onChange={(e) => setMsg(e.target.value)}
            type="text"
            placeholder="Type a message"
            className='flex-1 bg-transparent focus:outline-none text-gray-700'
          />
          <BsEmojiSmile
            onClick={() => setShowEmoji(!showEmoji)}
            className="relative  text-2xl text-gray-500 cursor-pointer hover:text-primary transition-colors"
          />
        </div>

        {/* সেন্ড বাটন */}
        <button
          onClick={handleSendMsg}
          className='w-[50px] h-[50px] bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition'
        >
          <LiaSmsSolid className='text-2xl' />
        </button>
      </div>

    </div>
  );
};

export default ChatBox;
