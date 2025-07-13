import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import UserList from '../components/UserList/UserList';
import GroupList from '../components/GroupList/GroupList';
import FriendRequest from '../components/FriendRequest/FriendRequest';
import Friends from '../components/Friends/Friends';
import BlockUser from '../components/BlockUser/BlcokUser';
import MyGroup from '../components/MyGroup/MyGroup';




const Home = () => {
    const auth = getAuth();
  const navigate = useNavigate()
  const data = useSelector(state => state.userLogInfo.value)
  console.log(data, "data");


  const [ loading , setLoading ] =useState(true)
  const [verify, setVerify] = useState(false )

  useEffect(()=>{
    if(!data){
        navigate("/login")
    }
  },[])


onAuthStateChanged(auth, (user) => {
  console.log(user , "homeuser" );
  
  if (user.emailVerified) {
    setVerify(true)
    setLoading(false)    
  }
});

if(loading){
  return null ;
}

  return (
    <>
      {
        verify ?
          <div className='flex p-[35px]'>
            <div className='w-[186px]'>
              <Sidebar />
            </div>
            <div className='w-[427px] ml-13'>
              <GroupList />
              <FriendRequest />
            </div>
            <div className='w-[344px] ml-10'>
              <Friends />
              <MyGroup />
              
            </div>
            <div className='w-[344px] ml-10'>
              <UserList />
              <BlockUser />
            </div>
          </div>
           :
          <p > PLEASE VERIFY YOUR EMAIL </p>
      } 

    </>
  )
}

export default Home
