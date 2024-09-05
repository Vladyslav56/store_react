import styles from "../../styles/Product.module.css"
import { useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addToCart } from "../../futures/cartSlice"
import { BASE_URL } from "../../utils/constants"

export default function Product() {
	const location = useLocation()
	const product = location.state
	const dispatch = useDispatch()

	const handleAddToCart = () => {
		dispatch(addToCart(product))
	}

	return (
		<section className={styles.page}>
			<div className={styles.product}>
				<div className={styles.image}>
					<img alt="product" src={`${BASE_URL}/${product.image}`} />
				</div>
				<div className={styles.about}>
					<h2 className={styles.title}>{product.title}</h2>
					<p className={styles.subtitle}>{product.subtitle}</p>
					<div className={styles.price}>{product.price}P</div>
					<p>{product.description}</p>
					<button onClick={handleAddToCart}>Добавить в корзину</button>
				</div>
			</div>
		</section>
	)
}
