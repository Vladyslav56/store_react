import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../utils/constants"

export const getProducts = createAsyncThunk(
	"products/getProducts",
	async (_, thunkApi) => {
		try {
			const res = await axios.get(`${BASE_URL}/products`)
			return res.data
		} catch (err) {
			console.log(err)
			return thunkApi.rejectWithValue(err)
		}
	}
)

const productsSlice = createSlice({
	name: "products",
	initialState: {
		productsList: [],
		isLoading: false,
	},
	extraReducers: (builder) => {
		builder.addCase(getProducts.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(getProducts.fulfilled, (state, { payload }) => {
			state.isLoading = false
			state.productsList = payload
		})
		builder.addCase(getProducts.rejected, (state) => {
			state.isLoading = true
		})
	},
})

export default productsSlice.reducer
