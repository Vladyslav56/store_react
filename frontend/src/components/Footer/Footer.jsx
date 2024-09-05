import { Link } from "react-router-dom"
import { ROUTES } from "../../utils/routes"

import styles from "../../styles/Footer.module.css"

export default function Footer() {
	return (
		<div className={styles.footer}>
			<div className={styles.img}>
				<Link to={ROUTES.HOME}>
					<img alt="logo" src={`${process.env.PUBLIC_URL}/logo.svg`} />
				</Link>
			</div>
			<div className={styles.info}>
				<div>
					<p className={styles.text}>Адрес магазина:</p>
					<p className={styles.text}>г.Шахтерск, ул.Почтовая 2</p>
				</div>
				<p className={styles.text}>тел.: +70000000000</p>
				<p className={styles.text}>© Все права защищены 2024</p>
			</div>
		</div>
	)
}
