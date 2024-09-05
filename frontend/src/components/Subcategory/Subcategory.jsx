import { useLocation } from "react-router-dom"
import Products from "../Products/Products"

export default function Subcategory() {
	const location = useLocation()
	const { id, name } = location.state

	return <Products subcategoryID={id} categoryName={name} />
}
