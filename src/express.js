//dependances
const express = require("express")
const app = express()
const { prisma } = require("./prisma")
const port = 3001
require("dotenv").config()
const jwt = require("jsonwebtoken")
const { UnauthorizedError } = require("express-jwt")
const cookieParser = require("cookie-parser")
const cors = require("cors")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
)

// Vérification du JWT dans le cookie
app.use((request, response, next) => {
  try {
    let req = request
    const route = req.originalUrl
    const uncheckedRoutes = ["/user/login", "/user/create"]

    // Si on est dans les routes du tableau au dessus, on check rien
    if (uncheckedRoutes.includes(route)) {
      return next()
    }

    const token = req.cookies.access_token
    const decoded = jwt.decode(token, { complete: true })

    // On vérifie l'authenticitée du cookie
    try {
      jwt.verify(token, process.env.TOKEN_SECRET)
    } catch (error) {
      console.log(error)
      throw new UnauthorizedError("invalid_token", error)
    }

    // On attache l'objet auth à req
    req["auth"] = decoded.payload
    next()
  } catch (error) {
    return next(error)
  }
})

//------------Importation des routes-----------------
const userRoutes = require("./routes/user")
const roomRoutes = require("./routes/room")
const boxRoutes = require("./routes/box")
const objectRoutes = require("./routes/object")
const societyRoutes = require("./routes/society")
const { contentType } = require("express/lib/response")

//-----------User---------------

app.post("/user/create", userRoutes.createUser)
app.post("/user/delete", userRoutes.deleteUser)
app.get("/user/information", userRoutes.infoUser)
app.get("/user/list", userRoutes.listUser)
app.post("/user/login", userRoutes.login)
app.post("/user/update", userRoutes.updateUser)
app.post("/user/updatePwd", userRoutes.updatePwd)
app.get("/user/disconnect", userRoutes.disconnect)
app.post("/search", userRoutes.search)

//--------------Room----------------

app.post("/room/create", roomRoutes.createRoom)
app.post("/room/delete", roomRoutes.deleteRoom)
app.get("/room/information/:id", roomRoutes.infoRoom)
app.get("/room/list", roomRoutes.listRoom)
app.post("/room/update", roomRoutes.updateRoom)
app.get("/room/:id", roomRoutes.oneRoom)

//-------------Box---------------

app.post("/box/create", boxRoutes.createBox)
app.post("/box/delete", boxRoutes.deleteBox)
app.get("/box/information/:id", boxRoutes.infoBox)
app.get("/box/list", boxRoutes.listBox)
app.post("/box/update", boxRoutes.updateBox)
app.get("/box/:id", boxRoutes.oneBox)

// //------------Object------------------

app.post("/object/create", objectRoutes.createObject)
app.post("/object/delete", objectRoutes.deleteObject)
app.get("/object/list", objectRoutes.listObject)
app.post("/object/update", objectRoutes.updateObject)
app.get("/object/information/:id", objectRoutes.infoObject)

// -------------Society------------------
app.get("/society/users", societyRoutes.allUser)
app.get("/society/user/:id", societyRoutes.user)
app.get("/society/room/:id", societyRoutes.roomUser)
app.post("/society/search", societyRoutes.searchUser)

// respond with "hello world" when a GET request is made to the homepage
app.get("/rien", (req, res) => {
  const decoded = jwt.decode(req.cookies.access_token)
  console.log(req.auth)
  res.send(decoded)
})

app.get("/", (req, res) => {
  res.send("Salut")
})

app.listen(port, () => {
  console.log("Example app listening on port ${port}")
})
