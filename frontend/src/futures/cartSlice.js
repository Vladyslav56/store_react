import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		cartItems: [],
	},
	reducers: {
		addToCart: (state, { payload }) => {
			let newCart = [...state.cartItems]
			const found = state.cartItems.find(({ id }) => id === payload.id)

			if (found) {
				newCart = newCart.map((item) => {
					return item.id === payload.id
						? { ...item, quantity: payload.quantity || item.quantity + 1 }
						: item
				})
			} else newCart.push({ ...payload, quantity: 1 })

			state.cartItems = newCart
		},
		removeFromCart: (state, { payload }) => {
			state.cartItems = state.cartItems.filter(({ id }) => id !== payload)
		},
		clearCart: (state) => {
			state.cartItems = []
		},
	},
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer
