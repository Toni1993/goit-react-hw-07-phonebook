import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './contactsOperation';

export const getContacts = state => state.contacts.items;
export const getFilterContacts = state => state.contacts.filter;
export const isLoading = state => state.contacts.isLoading;

const contactsSlice = createSlice({
	name: 'contacts',
	initialState: {
		items: [],
		filter: '',
		isLoading: false,
		error: null,
	},
	reducers: {
		changeFilter(state, action) {
			state.filter = action.payload;
		},
	},
	extraReducers: {
		[addContact.pending]: state => {
			state.isLoading = true;
		},
		[addContact.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.items = [...state.items, payload];
		},
		[addContact.rejected]: (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		},
		[deleteContact.pending]: state => {
			state.isLoading = true;
		},
		[deleteContact.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.items = state.items.filter(item => item.id !== payload);
		},
		[deleteContact.rejected]: (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		},
		[fetchContacts.pending]: state => {
			state.isLoading = true;
		},
		[fetchContacts.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.items = [...payload];
		},
		[fetchContacts.rejected]: (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		},
	},
});

export const { addContactList, removeContact, changeFilter } =
	contactsSlice.actions;

export default contactsSlice.reducer;
