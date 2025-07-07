import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';



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
            <div className='w-[427px]'>jvbgbvccjuf</div>
            <div className='w-[344px]'>jvbgbvccjuf</div>
            <div className='w-[344px]'>jvbgbvccjuf</div>
          </div>
           :
          <p > PLEASE VERIFY YOUR EMAIL </p>
      } 

    </>
  )
}

export default Home
