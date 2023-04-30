import {createSlice} from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        userObject: {}, 
        userPrivateKey: "",
    },
    reducers: {
        setUserObject: (state, action) => {
            state.userObject = action.payload;
        },
        setUserPrivateKey: (state, action) => {
            state.userPrivateKey = action.payload;
        }
    }
});

export const {setUserObject, setUserPrivateKey} = usersSlice.actions;
export default usersSlice.reducer;