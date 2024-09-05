const express = require("express")
const nodemailer = require("nodemailer")
const path = require("path")
const cors = require("cors")
const fs = require("fs")
const app = express()
require("dotenv").config()

console.log(process.env.PASSWORD, process.env.MAIL)

app.use(
	cors({
		origin: "http://localhost:3000",
	})
)

const categories = JSON.parse(fs.readFileSync("./data/categories.json"))
const subcategories = JSON.parse(fs.readFileSync("./data/subcategories.json"))
const products = JSON.parse(fs.readFileSync("./data/products.json"))

app.get("/api/subcategories", (req, res) => {
	res.json(subcategories)
})

app.get("/api/categories", (req, res) => {
	res.json(categories)
})

app.get("/api/products", (req, res) => {
	res.json(products)
})

app.get("/api/images/:filename", (req, res) => {
	const filename = req.params.filename
	const imagePath = path.join("images", filename)

	fs.readFile(imagePath, (err, data) => {
		if (err) {
			res.status(404).send("Image not found")
		} else {
			res.contentType("image/jpeg")
			res.send(data)
		}
	})
})

app.use(express.json())

app.post("/api/send-order", async (req, res) => {
	const { cartItems, user } = req.body

	if (!cartItems || !user) {
		return res.status(400).json({ error: "Недостаточно данных" })
	}

	try {
		const transporter = nodemailer.createTransport({
			host: "smtp.office365.com",
			port: 587,
			secure: false,

			auth: {
				user: process.env.MAIL,
				pass: process.env.PASSWORD,
			},
		})

		const mailOptions = {
			from: process.env.MAIL,
			to: process.env.MAIL,
			subject: "Новый заказ!",
			html: `
    <p>Новый заказ!</p>
		<p>Имя и фамилия: ${user.firstName} ${user.lastName}</p>
    <p>Номер телефона: +7 ${user.phone}</p>
    <p>Товары:</p>
    <ul>
        ${cartItems
					.map((item) => `<li>${item.title} - ${item.quantity}шт</li>`)
					.join("")}
    </ul>
    `,
			headers: {
				"Content-Type": "text/html; charset=utf-8",
			},
		}

		await transporter.sendMail(mailOptions)
		res.json({ message: "Заказ успешно оформлен" })
	} catch (error) {
		console.error("Ошибка при отправке письма:", error)
		res.status(500).json({ error: "Произошла ошибка при отправке заказа" })
	}
})

app.listen(3001, () => {
	console.log("Server listening on port 3001")
})
