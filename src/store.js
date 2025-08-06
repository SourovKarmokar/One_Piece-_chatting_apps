import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from './slice/userSlice'
import  activeMsgSlice  from './slice/activeMsgSlice'

export default configureStore({
  reducer: {
    userLogInfo:userSlice,
    activeInfo : activeMsgSlice,
  }
})