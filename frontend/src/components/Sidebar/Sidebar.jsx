import { Link, NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react"
import { ROUTES } from "../../utils/routes"

import styles from "../../styles/Sidebar.module.css"

export default function Sidebar() {
	const [isOpen, setIsOpen] = useState(false)
	const { categoriesList, subcategoriesList, isLoading } = useSelector(
		({ categories }) => categories
	)

	const toggleMenu = () => {
		setIsOpen((prev) => !prev)
	}

	return (
		<div className={styles.sidebar}>
			<div
				className={[styles.title, isOpen && styles.open].join(" ")}
				onClick={toggleMenu}
			>
				<div>Категории</div>
				<img src={`${process.env.PUBLIC_URL}/arrow-down.svg`} alt="" />
			</div>

			{isLoading ? (
				<div>Загрузка...</div>
			) : (
				<nav>
					<ul className={[styles.menu, isOpen && styles.open].join(" ")}>
						<li>
							<Link to={ROUTES.HOME} className={styles.link}>
								Все товары
							</Link>
						</li>
						{categoriesList.map((category) => (
							<li key={category.id} className={styles.category}>
								<NavLink
									state={category}
									className={styles.link}
									to={`categories/${category.id}`}
								>
									{category.name}
								</NavLink>
								{subcategoriesList.map((subcategory) =>
									subcategory.category_id === category.id ? (
										<NavLink
											key={subcategory.id}
											to={`categories/${category.id}/subcategories/${subcategory.id}`}
											className={styles.subcategory}
											state={subcategory}
										>
											{subcategory.name}
										</NavLink>
									) : null
								)}
							</li>
						))}
					</ul>
				</nav>
			)}
		</div>
	)
}
