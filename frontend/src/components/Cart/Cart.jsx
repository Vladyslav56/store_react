import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { BASE_URL } from "../../utils/constants"
import { addToCart, removeFromCart } from "../../futures/cartSlice"

import styles from "../../styles/Cart.module.css"

export default function Cart() {
	const dispatch = useDispatch()
	const { cartItems } = useSelector(({ cart }) => cart)

	const sumBy = (arr) => arr.reduce((prev, cur) => prev + cur, 0)

	const quantityChange = (item, quantity) => {
		dispatch(addToCart({ ...item, quantity }))
	}

	const removeItem = (id) => {
		dispatch(removeFromCart(id))
	}

	return (
		<section className={styles.page}>
			<h2 className={styles.title}>Корзина</h2>
			{cartItems.length ? (
				<div className={styles.cart}>
					{cartItems.map((item) => (
						<div key={item.id} className={styles.item}>
							<div className={styles.image}>
								<img src={`${BASE_URL}/${item.image}`} alt="product" />
							</div>

							<div className={styles.content}>
								<div className={styles.about}>
									<div>{item.title}</div>
									<div>{item.subtitle}</div>
								</div>

								<div className={styles.price}>
									<div>Цена за шт.:</div>
									<div>{item.price}p</div>
								</div>

								<div className={styles.quantity}>
									<div
										className={styles.minus}
										onClick={() =>
											quantityChange(item, Math.max(1, item.quantity - 1))
										}
									>
										<svg className="icon">
											<use
												xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`}
											/>
										</svg>
									</div>

									<span>{item.quantity}</span>

									<div
										className={styles.plus}
										onClick={() =>
											quantityChange(item, Math.max(1, item.quantity + 1))
										}
									>
										<svg className="icon">
											<use
												xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`}
											/>
										</svg>
									</div>
								</div>

								<div className={styles.price}>
									<div>Общая цена:</div>
									<div>{item.price * item.quantity}p</div>
								</div>

								<div
									className={styles.close}
									onClick={() => removeItem(item.id)}
								>
									<svg className="icon">
										<use
											xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}
										/>
									</svg>
								</div>
							</div>
						</div>
					))}
					<div className={styles.total}>
						<div>Итоговая цена: </div>
						<span>
							{sumBy(cartItems.map(({ price, quantity }) => quantity * price))}p
						</span>
					</div>

					<Link to={"order"}>
						<button>Продолжить</button>
					</Link>
				</div>
			) : (
				<div>В корзине ничего нет</div>
			)}
		</section>
	)
}
