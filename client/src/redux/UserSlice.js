import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isAuthenticated: false
}

const userSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
        setUser(state, action){
            state.user = action.payload;
            state.isAuthenticated = true
        },
        clearUser(state){
            state.user = null;
            state.isAuthenticated = false;
        }
    }
})

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer