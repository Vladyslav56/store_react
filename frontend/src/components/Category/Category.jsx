import { useLocation } from "react-router-dom"
import Products from "../Products/Products"

export default function Category() {
	const location = useLocation()
	const { id, name } = location.state

	return <Products categoryID={id} categoryName={name} />
}
