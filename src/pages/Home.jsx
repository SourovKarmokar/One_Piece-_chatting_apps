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
    const navigate = useNavigate();
    const data = useSelector(state => state.userLogInfo.value);
    const [loading, setLoading] = useState(true);
    const [verify, setVerify] = useState(false);

    useEffect(() => {
        if (!data) {
            navigate("/login");
        }

        // Properly set up the auth state listener inside useEffect
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setVerify(user.emailVerified);
                setLoading(false);
            } else {
                setVerify(false);
                setLoading(false);
            }
        });

        // Clean up the listener when component unmounts
        return () => unsubscribe();
    }, [auth, data, navigate]);

    if (loading) {
        return null;
    }

    return (
        <div>
            {verify ? (
                <div className='flex '>
                    <div className='w-[186px] h-full'>
                        <Sidebar />
                    </div>
                    <div className='flex   xl:w-[82%] pt-[30px] flex-col xl:flex-row px-3 xl:px-0 items-start   gap-y-8 xl:mr-[15px] w-[427px]'>
                        <div className=' flex flex-col gap-y-7 ml-13  w-[30%]'>
                            <GroupList  />
                            <FriendRequest />
                        </div>
                        <div className='ml-10  flex flex-col gap-y-7 w-[30%]'>
                            <Friends />
                            <MyGroup />
                        </div>
                        <div className='ml-10 flex flex-col gap-y-7  w-[30%]' >
                            <UserList />
                            <BlockUser />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-screen">
                    <p className="text-2xl font-bold">PLEASE VERIFY YOUR EMAIL</p>
                </div>
            )}
        </div>
    );
}

export default Home;