import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: localStorage.getItem("userLoginInfo") ? JSON.parse(localStorage.getItem("userLoginInfo")) : null
  },
  reducers: {
    userLogInfo: (state , actions) => {
      console.log(state.value);
      console.log(actions.payload);
      state.value = actions.payload
     },
    
    }
})


export const { userLogInfo } = userSlice.actions

export default userSlice.reducer