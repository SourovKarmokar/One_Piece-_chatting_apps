import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
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
  const navigate = useNavigate();
  const data = useSelector(state => state.userLogInfo.value);
  const [loading, setLoading] = useState(true);
  const [verify, setVerify] = useState(false);

  useEffect(() => {
    if (!data) {
      navigate("/login");
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user, "homeuser");

      if (user?.emailVerified) {
        setVerify(true);
      }

      setLoading(false); // Always stop loading, even if not verified
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {verify ? (
        <div className='flex'>
          <div className='w-[186px] h-full'>
            <Sidebar />
          </div>

          <div className='flex xl:w-[82%] pt-[30px] flex-col xl:flex-row px-3 xl:px-0 items-start xl:h-[95vh] gap-y-8 xl:mr-[15px] w-[427px]'>
            <div className='ml-13'>
              <GroupList />
              <FriendRequest />
            </div>
            <div className='ml-10'>
              <Friends />
              <MyGroup />
            </div>
            <div className='ml-10'>
              <UserList />
              <BlockUser />
            </div>
          </div>
        </div>
      ) : (
        <p className='text-center text-red-500 text-xl mt-10'>PLEASE VERIFY YOUR EMAIL</p>
      )}
    </div>
  );
};

export default Home;
