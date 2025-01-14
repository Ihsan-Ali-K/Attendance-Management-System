import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        loading: false,
        error: false

    },
    reducers: {
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
         
            state.loading = false,
            state.currentUser = action.payload
       
          
        },
        loginFailure: (state) => {
            state.loading = false,
                state.error = true

        },
        logout: (state) => {
            state.currentUser = null,
                state.loading = false,
                state.error = false
        }
    }
})

// Action creators are generated for each case reducer function
export const { loginFailure, loginStart, loginSuccess, logout } = userSlice.actions

export default userSlice.reducer