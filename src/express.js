//dependances
const express = require("express")
const app = express()
const { prisma } = require("./prisma")
const port = 3000
require("dotenv").config()
const jwt = require("jsonwebtoken")
const { jwtMiddleware } = require("./jwt")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(jwtMiddleware)

//------------Importation des routes-----------------
const userRoutes = require("./routes/user")
const roomRoutes = require("./routes/room")
const boxRoutes = require("./routes/box")
const objectRoutes = require("./routes/object")

//-----------User---------------

app.post("/user/create", userRoutes.createUser)
app.delete("/user/delete", userRoutes.deleteUser)
app.get("/user/information/:id", userRoutes.infoUser)
app.get("/user/list", userRoutes.listUser)
app.post("/user/login", userRoutes.login)
app.post("/user/update", userRoutes.updateUser)
app.post("/user/updatePwd", userRoutes.updatePwd)

//--------------Room----------------

app.post("/room/create", roomRoutes.createRoom)
app.delete("/room/delete", roomRoutes.deleteRoom)
app.get("/room/information/:id", roomRoutes.infoRoom)
app.get("/room/list/:id", roomRoutes.listRoom)
app.post("/room/update", roomRoutes.updateRoom)

//-------------Box---------------

app.post("/box/create", boxRoutes.createBox)
app.delete("/box/delete", boxRoutes.deleteBox)
app.get("/box/information/:id", boxRoutes.infoBox)
app.get("/box/list/:id", boxRoutes.listBox)
app.post("/box/update", boxRoutes.updateBox)

// //------------Object------------------

app.post("/object/create", objectRoutes.createObject)
app.delete("/object/delete", objectRoutes.deleteObject)
app.get("/object/list/:id", objectRoutes.listObject)
app.post("/object/update", objectRoutes.updateObject)

// respond with "hello world" when a GET request is made to the homepage
app.get("/rien", (req, res) => {
  const decoded = jwt.decode(req.json)
  res.send(req.json)
})

app.post("/", (req, res) => {
  res.send("Bonjour")
})

app.listen(port, () => {
  console.log("Example app listening on port ${port}")
})
