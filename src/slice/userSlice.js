import { createSlice } from '@reduxjs/toolkit'
import { update } from 'firebase/database';

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
     
  updateDisplayName: (state, action) => {
    if (state.value && state.value.user) {
      state.value.user.displayName = action.payload;

      const updateUser = {...state.value}
      localStorage.setItem("userLogInfo" , JSON.stringify(updateUser))
      
      // Update localStorage too
      // localStorage.setItem("userLoginInfo", JSON.stringify(state.value.user));
    }
  }
}
})


export const { userLogInfo , updateDisplayName  } = userSlice.actions

export default userSlice.reducer