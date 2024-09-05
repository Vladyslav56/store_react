import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../utils/constants"

export const getCategories = createAsyncThunk(
	"categories/getCategories",
	async (_, thunkApi) => {
		try {
			const res = await axios.get(`${BASE_URL}/categories`)
			return res.data
		} catch (err) {
			console.log(err)
			return thunkApi.rejectWithValue(err)
		}
	}
)

export const getSubcategories = createAsyncThunk(
	"subcategories/getSubcategories",
	async (_, thunkApi) => {
		try {
			const res = await axios.get(`${BASE_URL}/subcategories`)
			return res.data
		} catch (err) {
			console.log(err)
			return thunkApi.rejectWithValue(err)
		}
	}
)

const categoriesSlice = createSlice({
	name: "categories",
	initialState: {
		categoriesList: [],
		subcategoriesList: [],
		isLoading: false,
	},
	extraReducers: (builder) => {
		builder.addCase(getCategories.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(getCategories.fulfilled, (state, { payload }) => {
			state.isLoading = false
			state.categoriesList = payload
		})
		builder.addCase(getCategories.rejected, (state) => {
			state.isLoading = true
		})
		builder.addCase(getSubcategories.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(getSubcategories.fulfilled, (state, { payload }) => {
			state.isLoading = false
			state.subcategoriesList = payload
		})
		builder.addCase(getSubcategories.rejected, (state) => {
			state.isLoading = true
		})
	},
})

export default categoriesSlice.reducer
