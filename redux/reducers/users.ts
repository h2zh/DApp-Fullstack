import {createSlice} from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        userObject: {}, 
    },
    reducers: {
        setUserObject: (state, action) => {
            state.userObject = action.payload;
        }
    }
});

export const {setUserObject} = usersSlice.actions;
export default usersSlice.reducer;