import { Link } from "react-router-dom"
import { ROUTES } from "../../utils/routes"
import { useState } from "react"
import { useSelector } from "react-redux"

import styles from "../../styles/Header.module.css"

export default function Header() {
	const [searchValue, setSearchValue] = useState("")
	const [searchResults, setSearchResults] = useState([])
	const { cartItems } = useSelector(({ cart }) => cart)
	const { productsList } = useSelector(({ products }) => products)

	const handleSearch = ({ target: { value } }) => {
		setSearchValue(value)
		if (value === "") setSearchResults([])
		else {
			const filteredProducts = productsList.filter((product) =>
				product.title.toLowerCase().includes(value.toLowerCase())
			)
			setSearchResults(filteredProducts)
		}
	}

	return (
		<div>
			<div className={styles.header}>
				<div className={styles.img}>
					<Link to={ROUTES.HOME}>
						<img alt="logo" src={`${process.env.PUBLIC_URL}/logo.svg`} />
					</Link>
				</div>

				<form className={styles.form}>
					<div className={styles.search}>
						<svg className="icon">
							<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
						</svg>
					</div>
					<div className={styles.input}>
						<input
							type="text"
							name="search"
							onChange={handleSearch}
							value={searchValue}
							autoComplete="off"
							placeholder="Найти товар"
						/>
					</div>
					<div className={styles.close} onClick={() => setSearchValue("")}>
						<svg className="icon">
							<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
						</svg>
					</div>
					{searchValue && (
						<div className={styles.box}>
							{searchResults.length > 0
								? searchResults.map((product) => (
										<Link
											key={product.id}
											to={`/products/${product.id}`}
											onClick={() => setSearchValue("")}
											state={product}
										>
											{product.title}
										</Link>
								  ))
								: "Нет результатов"}
						</div>
					)}
				</form>

				<Link to={ROUTES.CART} className={styles.cart}>
					<img
						className={styles["icon-cart"]}
						src={`${process.env.PUBLIC_URL}/cart.svg`}
						alt="cart"
					/>
					{!!cartItems.length && (
						<span className={styles.count}>{cartItems.length}</span>
					)}
				</Link>
			</div>
			<div className={styles.poster}>
				<h1 className={styles.title}>
					Высокое качество и забота о ваших животных
				</h1>
			</div>
		</div>
	)
}
