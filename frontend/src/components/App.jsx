import React, { useEffect } from "react"
import { useDispatch } from "react-redux"

import { getProducts } from "../futures/productsSlice"
import { getCategories, getSubcategories } from "../futures/categoriesSlice"

import AppRoutes from "./Routes/Routes"
import Header from "./Header/Header"
import Sidebar from "./Sidebar/Sidebar"
import Footer from "./Footer/Footer"

export default function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getProducts())
		dispatch(getCategories())
		dispatch(getSubcategories())
	}, [dispatch])

	return (
		<div className="app">
			<Header />
			<div className="container">
				<Sidebar />
				<AppRoutes />
			</div>
			<Footer></Footer>
		</div>
	)
}
