import { createSlice } from '@reduxjs/toolkit'

export const activeMsgSlice  = createSlice({
  name: 'active',
  initialState: {
    value: ""
  },
  reducers: {
    activeMsgInfo: (state , actions) => {
      state.value = actions.payload
     },
    
    }
})


export const { activeMsgInfo } = activeMsgSlice.actions

export default activeMsgSlice.reducer