import styles from "../../styles/Products.module.css"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../../futures/cartSlice"
import { BASE_URL } from "../../utils/constants"

export default function Products({
	categoryID,
	categoryName = "Главная",
	subcategoryID,
}) {
	const dispatch = useDispatch()
	const { productsList, isLoading } = useSelector(({ products }) => products)
	const [currentPage, setCurrentPage] = useState(1)
	const productsPerPage = 12

	useEffect(() => {
		setCurrentPage(1)
	}, [categoryID, subcategoryID])

	const filteredProducts = subcategoryID
		? productsList.filter((product) => product.subcategory === subcategoryID)
		: categoryID
		? productsList.filter((product) => product.category === categoryID)
		: productsList

	const idLastProduct = currentPage * productsPerPage
	const idFirstProduct = idLastProduct - productsPerPage
	const currentProducts = filteredProducts.slice(idFirstProduct, idLastProduct)

	const paginate = (pageNumber) => setCurrentPage(pageNumber)

	const pageNumbers = []
	for (
		let i = 1;
		i <= Math.ceil(filteredProducts.length / productsPerPage);
		i++
	) {
		pageNumbers.push(i)
	}

	function handleClick(event, product) {
		event.preventDefault()
		dispatch(addToCart(product))
	}

	return (
		<section className={styles.page}>
			<h2 className={styles.category}>{categoryName}</h2>

			{isLoading ? (
				<div>Загрузка...</div>
			) : (
				<div className={styles.products}>
					{currentProducts.map((product) => (
						<Link
							to={`/products/${product.id}`}
							key={product.id}
							className={styles.product}
							state={product}
						>
							<div className={styles.image}>
								<img src={`${BASE_URL}/${product.image}`} alt="product" />
							</div>

							<div className={styles.title}>{product.title}</div>
							<div className={styles.subtitle}>{product.subtitle}</div>

							<div className={styles.price}>{product.price}p</div>
							<button
								className={styles.button}
								onClick={(event) => handleClick(event, product)}
							>
								В корзину
							</button>
						</Link>
					))}
				</div>
			)}

			{pageNumbers.length > 1 && (
				<div className={styles.pagination}>
					{/* Кнопки для навигации */}
					<button
						onClick={() => paginate(currentPage - 1)}
						disabled={currentPage === 1}
						className={styles.change}
					>
						<img src={`${process.env.PUBLIC_URL}/arrow-left.svg`} alt="" />
					</button>

					{pageNumbers.map((number) => (
						<button
							key={number}
							onClick={() => paginate(number)}
							className={number === currentPage ? styles.active : styles.change}
						>
							{number}
						</button>
					))}

					<button
						onClick={() => paginate(currentPage + 1)}
						disabled={
							currentPage ===
							Math.ceil(filteredProducts.length / productsPerPage)
						}
						className={styles.change}
					>
						<img src={`${process.env.PUBLIC_URL}/arrow-right.svg`} alt="" />
					</button>
				</div>
			)}
		</section>
	)
}
