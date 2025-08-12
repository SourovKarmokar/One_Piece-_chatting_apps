
import Settings from '../components/Settings/Settings';
import Sidebar from '../components/Sidebar/Sidebar'



const Setting = () => {
  
    return (
    <div className='flex'>
      {/* Sidebar Section */}
      <div className='w-[186px] h-full'>
        <Sidebar active="setting" />
      </div>
        <Settings />
      
    </div>
  );
};





export default Setting
