import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: { displayName: '', uid: '' },
	reducers: {
		loginUser: (state, action) => {
			state.displayName = action.payload.displayName;
			state.uid = action.payload.uid;
		},
		logoutUser: (state) => {
			state.displayName = '';
			state.uid = '';
		},
	},
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
