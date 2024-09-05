import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { Link } from "react-router-dom"

import { BASE_URL } from "../../utils/constants"
import { ROUTES } from "../../utils/routes"
import { clearCart } from "../../futures/cartSlice"

import styles from "../../styles/Order.module.css"

export default function Order() {
	const { cartItems } = useSelector(({ cart }) => cart)
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		phone: "",
	})
	const [fieldErrors, setFieldErrors] = useState({
		firstName: "",
		lastName: "",
		phone: "",
		terms: "",
	})
	const [isChecked, setIsChecked] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const dispatch = useDispatch()

	const handleChange = ({ target: { value, name } }) => {
		setUser((prev) => ({ ...prev, [name]: value }))
		console.log(user)

		setFieldErrors((prev) => ({
			...prev,
			[name]: validateField(name, value),
		}))
	}

	const handleCheckboxChange = () => {
		setIsChecked((prev) => {
			const newChecked = !prev

			setFieldErrors((errors) => ({
				...errors,
				terms: newChecked ? "" : "Вы должны согласиться с условиями",
			}))

			return newChecked
		})
	}

	const validateField = (name, value) => {
		switch (name) {
			case "firstName":
			case "lastName":
				return value.trim() === "" ? "Поле должно быть заполнено" : ""
			case "phone":
				return value.length !== 10
					? "Номер телефона должен состоять из 10 цифр без знаков -"
					: ""
			default:
				return ""
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const newErrors = {}
		Object.keys(user).forEach((key) => {
			const error = validateField(key, user[key])
			if (error) {
				newErrors[key] = error
			}
		})

		if (!isChecked) {
			newErrors.terms = "Вы должны согласиться с условиями"
		}

		setFieldErrors(newErrors)

		console.log(fieldErrors)

		if (!cartItems) return

		if (Object.keys(newErrors).length > 0) {
			return
		}

		try {
			const res = await axios.post(`${BASE_URL}/send-order`, {
				cartItems,
				user,
			})
			dispatch(clearCart())
			setIsSuccess(!isSuccess)
			console.log(res.data)
		} catch (err) {
			alert(
				"Произошла ошибка при отправке заказа. Пожалуйста, попробуйте позже."
			)
			console.log(err)
		}
	}

	return (
		<section className={styles.page}>
			{isSuccess ? (
				<div className={styles.success}>
					<img
						className={styles["icon-success"]}
						src={`${process.env.PUBLIC_URL}/success.svg`}
						alt="success"
					/>
					<p>Заказ успешно оформлен!</p>
					<p>Мы вам перезвоним для уточнения подробностей</p>
					<Link to={ROUTES.HOME} className={styles.link}>
						<button>Вернуться на главную</button>
					</Link>
				</div>
			) : (
				<form className={styles.form}>
					<h2 className={styles.title}>Введите данные</h2>
					<div className={styles.name}>
						<div>
							<label htmlFor="firstName" className={styles.label}>
								Имя:
							</label>
							<input
								type="text"
								id="firstName"
								name="firstName"
								value={user.firstName}
								className={[
									styles.input,
									fieldErrors.firstName && styles.border,
								].join(" ")}
								onChange={handleChange}
								autoComplete="false"
							/>
							{fieldErrors.firstName && (
								<span className={styles.error}>{fieldErrors.firstName}</span>
							)}
						</div>

						<div>
							<label htmlFor="lastName" className={styles.label}>
								Фамилия:
							</label>
							<input
								type="text"
								id="lastName"
								name="lastName"
								value={user.lastName}
								className={[
									styles.input,
									fieldErrors.lastName && styles.border,
								].join(" ")}
								onChange={handleChange}
								autoComplete="false"
							/>
							{fieldErrors.lastName && (
								<span className={styles.error}>{fieldErrors.lastName}</span>
							)}
						</div>
					</div>
					<div className={styles.tel}>
						<label htmlFor="phone" className={styles.label}>
							Номер телефона:
						</label>
						<input
							className={[
								styles.input,
								styles.number,
								fieldErrors.phone && styles.border,
							].join(" ")}
							type="number"
							id="phone"
							name="phone"
							value={user.phone}
							onChange={handleChange}
							autoComplete="false"
						/>
						<span className={styles.start}>+7</span>
						{fieldErrors.phone && (
							<span className={styles.error}>{fieldErrors.phone}</span>
						)}
					</div>

					<div style={{ position: "relative" }}>
						<input
							type="checkbox"
							id="checkbox"
							required
							className={styles.check}
							checked={isChecked}
							onChange={handleCheckboxChange}
						/>
						<img
							className={styles["icon-check"]}
							src={`${process.env.PUBLIC_URL}/check.svg`}
							alt="cart"
						/>
						<label htmlFor="checkbox" className={styles.custom}>
							Я соглашаюсь с обработкой предоставленных данных
						</label>
						{fieldErrors.terms && (
							<span className={styles.error}>{fieldErrors.terms}</span>
						)}
					</div>
					<button onClick={handleSubmit}>Оформить заказ</button>
				</form>
			)}
		</section>
	)
}
