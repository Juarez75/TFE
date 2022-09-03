const { prisma } = require("../../prisma")
const path = require("path")
const fs = require("fs")
const { randomUUID } = require("crypto")
const sharp = require("sharp")

async function createBox(req, res) {
  try {
    //on récupère les données
    const id_user = req.auth.id
    const name = req.body.name
    const comment = req.body.comment
    const id_room = parseInt(req.body.id_room)
    var url_img
    var err
    //test Photo
    if (req.file != undefined) {
      const buffer = await sharp(req.file.buffer).resize(300, 300).toBuffer()
      const uid = randomUUID()
      fs.createWriteStream("../uploads/" + uid + ".jpg").write(buffer)
      url_img =
        req.protocol + "://" + req.headers.host + "/private/" + uid + ".jpg"
    }

    //vérification que c'est la pièce appartient bien à l'utilisateur
    const room = await prisma.room.findUnique({
      where: {
        id: id_room
      }
    })
    if (id_user != room.id_user) {
      return res.status(403).send("BAD_REQUEST")
    }

    //on ajoute la boite à la bdd
    const box = await prisma.box.create({
      data: {
        id_room: id_room,
        id_user: id_user,
        name: name,
        comment: comment,
        url_img: url_img
      }
    })
    res.status(200).send("Requête effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = createBox
