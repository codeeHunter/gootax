require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const router = require("./router")
const cookieParser = require("cookie-parser")

const PORT = process.env.PORT || 5000

const app = express()
app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use("/api", router)

const appStart = async () => {
	try {
		mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		app.listen(PORT, () => console.log(`Server started on ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}

appStart()