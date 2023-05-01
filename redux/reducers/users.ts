import {createSlice} from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        userObject: {}, 
        userPrivateKey: "",
        userProvider: {},
        loading: false,
    },
    reducers: {
        setUserObject: (state, action) => {
            state.userObject = action.payload;
        },
        setUserPrivateKey: (state, action) => {
            state.userPrivateKey = action.payload;
        },
        setUserProvider: (state, action) => {
            state.userProvider = action.payload;
        },
        setLoading: (state, action) => {
            state.userProvider = action.payload;
        }
    }
});

export const {setUserObject, setUserPrivateKey, setUserProvider, setLoading} = usersSlice.actions;
export default usersSlice.reducer;