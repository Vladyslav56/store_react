import { Route, Routes } from "react-router-dom"
import { ROUTES } from "../../utils/routes"
import Home from "../Home/Home"
import Category from "../Category/Category"
import Subcategory from "../Subcategory/Subcategory"
import Product from "../Products/Product"
import Cart from "../Cart/Cart"
import Order from "../Order/Order"

export default function AppRoutes() {
	return (
		<Routes>
			<Route index element={<Home />} />
			<Route path={ROUTES.CATEGORY} element={<Category />} />
			<Route path={ROUTES.SUBCATEGORY} element={<Subcategory />} />
			<Route path={ROUTES.PRODUCT} element={<Product />} />
			<Route path={ROUTES.CART} element={<Cart />} />
			<Route path={ROUTES.ORDER} element={<Order />} />
		</Routes>
	)
}
