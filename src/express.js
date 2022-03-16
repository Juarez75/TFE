const express = require('express')
const app = express()
const port = 3000

//------------Importation des routes-----------------
const userRoutes = require("./routes/user")
const roomRoutes = require("./routes/room")
const boxRoutes = require("./routes/box")
const objectRoutes = require("./routes/object")

//-----------User---------------

app.post("/user/create", userRoutes.createUser)
app.delete("/user/delete", userRoutes.deleteUser)
app.get("/user/information", userRoutes.infoUser)
app.get("/user/list", userRoutes.listUser)
app.post("/user/login", userRoutes.login)
app.update("/user/update", userRoutes.updateUser)
app.update("/user/updatePwd", userRoutes.updatePwd)

//--------------Room----------------

app.post("/room/create", roomRoutes.createRoom)
app.delete("/room/delete", roomRoutes.deleteRoom)
app.get("/room/information", roomRoutes.infoRoom)
app.get("/room/list", roomRoutes.listRoom)
app.update("/room/update", roomRoutes.updateRoom)

//-------------Box---------------

app.post("/box/create", boxRoutes.createBox)
app.delete("/box/delete", boxRoutes.deleteBox)
app.get("/box/information", boxRoutes.infoBox)
app.get("/box/list", boxRoutes.listBox)
app.update("/box/update", boxRoutes.updateBox)

//------------Object------------------

app.post("/object/create", objectRoutes.createObject)
app.delete("/object/delete", objectRoutes.deleteObject)
app.get("/object/list", objectRoutes.listObject)
app.update("/object/update", objectRoutes.updateObject)


// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})

app.post('/', (req, res) => {
    res.send('Bonjour')
})

app.listen(port, () => {
    console.log('Example app listening on port ${port}')
})