
import GroupList from "../components/GroupList/GroupList";
import Sidebar from '../components/Sidebar/Sidebar'
import FriendRequest from "../components/FriendRequest/FriendRequest";
import Friends from "../components/Friends/Friends";


const Message = () => {
  
    return (
    <div className='flex'>
      {/* Sidebar Section */}
      <div className='w-[186px] h-full'>
        <Sidebar active="message" />
      </div>

      {/* Content Section */}
      <div className='flex flex-col xl:flex-row xl:w-[82%] pt-[30px] px-3 xl:px-[70px] items-start gap-y-8 xl:mr-[15px] w-full'>
        <div className='flex flex-col gap-y-7 w-[30%]'>
          <Friends />
          
          
        </div>
        {/* Add your other sections like GroupList or FriendRequest here */}
      </div>
    </div>
  );
};



export default Message
