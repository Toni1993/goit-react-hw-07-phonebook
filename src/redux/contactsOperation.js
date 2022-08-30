import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://630b7efaf280658a59dc70e2.mockapi.io/';

export const fetchContacts = createAsyncThunk(
	'contacts/fetchContacts',
	async (_, thunkApi) => {
		try {
			const contacts = await axios.get('/contacts');
			return contacts.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error);
		}
	},
);

export const addContact = createAsyncThunk(
	'contact/addContact',
	async (contact, thunkApi) => {
		try {
			const { data } = await axios.post('/contacts', contact);
			return data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.message);
		}
	},
);

export const deleteContact = createAsyncThunk(
	'contacts/deleteContact',
	async (id, thunkApi) => {
		try {
			await axios.delete(`/contacts/${id}`);
			return id;
		} catch (error) {
			return thunkApi.rejectWithValue(error);
		}
	},
);
