const express = require("express")
const cookieParser = require("cookie-parser")
const authRouter = require("./routers/authRouter")
const db = require("./database/model")
const restrict = require("./middleware/restrict")

const server = express()
const port = process.eventNames.PORT || 5000

server.use(express.json())
server.use(cookieParser())

server.use("/auth",authRouter)

server.get("/users", restrict(), async (req, res, next) => {
  try {
   res.json(await db.find())
  } catch(err) {
      next(err)
  }
})


server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
    console.log(`running at http://localhost:${port}`)
})