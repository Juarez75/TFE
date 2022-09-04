//dependances
const express = require("express")
const app = express()
const port = 3001
require("dotenv").config()
const jwt = require("jsonwebtoken")
const { UnauthorizedError } = require("express-jwt")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const multer = require("multer")
const { prisma } = require("./prisma")
const path = require("path")
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // Limite de 5mb
  }
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
)

// Vérification du JWT dans le cookie
app.use((request, response, next) => {
  try {
    let req = request
    const route = req.originalUrl
    const uncheckedRoutes = [
      "/user/login",
      "/user/create",
      "/refreshToken",
      "/test"
    ]

    // Si on est dans les routes du tableau au dessus, on check rien
    if (uncheckedRoutes.includes(route)) {
      return next()
    }

    const token = req.cookies.access_token
    const decoded = jwt.decode(token, { complete: true })

    // On vérifie l'authenticitée du cookie
    try {
      jwt.verify(token, process.env.TOKEN_ACCESS_SECRET)
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

//accès aux photos
app.use("/private", express.static(path.join(__dirname, "../uploads")))

//------------Importation des routes-----------------
const userRoutes = require("./routes/user")
const roomRoutes = require("./routes/room")
const boxRoutes = require("./routes/box")
const objectRoutes = require("./routes/object")
const societyRoutes = require("./routes/society")
const tagSocietyRoutes = require("./routes/tag/society")
const tagUserRoutes = require("./routes/tag/user")
const test = require("./routes/box/test")

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
app.get("/refreshToken", userRoutes.refreshToken)
app.post("/user/pdf", societyRoutes.pdf)

//--------------Room----------------

app.post("/room/create", roomRoutes.createRoom)
app.post("/room/delete", roomRoutes.deleteRoom)
app.get("/room/information/:id", roomRoutes.infoRoom)
app.get("/room/list", roomRoutes.listRoom)
app.post("/room/update", roomRoutes.updateRoom)
app.get("/room/:id", roomRoutes.oneRoom)

//-------------Box---------------

app.post("/box/create", upload.single("picture"), boxRoutes.createBox)
app.post("/box/delete", boxRoutes.deleteBox)
app.get("/box/information/:id", boxRoutes.infoBox)
app.get("/box/list", boxRoutes.listBox)
app.post("/box/update", upload.single("picture"), boxRoutes.updateBox)
app.get("/box/:id", boxRoutes.oneBox)
app.post("/box/state", boxRoutes.stateBox)
app.post("/box/fragile", boxRoutes.fragileBox)
app.post("/box/createmany", boxRoutes.createMany)
app.post("/box/deletemany", boxRoutes.deleteMany)
app.get("/box/qrcode/:id", boxRoutes.infoQrCode)
app.post("/box/updateManyRoom", boxRoutes.updateManyBoxRoom)

app.post("/test", test)

// //------------Object------------------

app.post("/object/create", objectRoutes.createObject)
app.post("/object/delete", objectRoutes.deleteObject)
app.get("/object/list", objectRoutes.listObject)
app.post("/object/update", objectRoutes.updateObject)
app.get("/object/information/:id", objectRoutes.infoObject)

// -------------Society------------------
app.get("/society/users", societyRoutes.allUser)
app.get("/society/user/:id", societyRoutes.user)
app.post("/society/updateColor", societyRoutes.updateColor)
app.post("/society/unlink", societyRoutes.unLinkUser)
app.post("/society/search", societyRoutes.searchUser)
app.get("/society/profile", societyRoutes.profileSociety)
app.get("/society/graphLastDays", societyRoutes.graphLastDays)
app.post("/society/graphMonth", societyRoutes.graphMonth)

// --------------TagSociety----------------------
app.post("/tag/society/create", tagSocietyRoutes.createTagSociety)
app.post("/tag/society/delete", tagSocietyRoutes.deleteTagSociety)
app.get("/tag/society", tagSocietyRoutes.societyTag)
app.post("/tag/society/deletelink", tagSocietyRoutes.destroyLinkRoom)

// --------------TagUser----------------------
app.post("/tag/user/create", tagUserRoutes.createTagUser)
app.post("/tag/user/delete", tagUserRoutes.deleteTagUser)
app.get("/tag/user", tagUserRoutes.userTag)
app.post("/tag/user/deletelink", tagUserRoutes.destroyLinkBox)
app.post("/tag/linkBox", tagUserRoutes.linkBox)
app.get("/tag/box/:id", tagUserRoutes.tagOnBox)

app.get("/isconnected", (req, res) => {
  res.send("Already connected")
})

app.listen(port, () => {
  console.log("App listening on port " + port)
})
