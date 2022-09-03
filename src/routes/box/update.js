const { prisma } = require("../../prisma")
const path = require("path")
const fs = require("fs")
const { randomUUID } = require("crypto")
const sharp = require("sharp")

async function updateBox(req, res) {
  try {
    //on récupère les données
    const id = parseInt(req.body.id)
    const name = req.body.name
    const comment = req.body.comment
    const id_room = parseInt(req.body.id_room)
    const state = parseInt(req.body.state)
    const imgChanged = req.body.imgChanged
    var url_img = null
    var err

    if (imgChanged) {
      if (req.file != undefined) {
        const buffer = await sharp(req.file.buffer).resize(300, 300).toBuffer()
        const uid = randomUUID()
        fs.createWriteStream("../uploads/" + uid + ".jpg").write(buffer)
        url_img =
          req.protocol + "://" + req.headers.host + "/private/" + uid + ".jpg"
      }
    }

    //vérification que c'est le bon utilisateur
    const box = await prisma.box.findUnique({
      where: {
        id: id
      }
    })
    if (id_user != box.id_user) {
      return res.status(403).send("BAD_REQUEST")
    }

    //on actualise les données de la boite
    if (imgChanged) {
      if (box.url_img != null) {
        const targetPath =
          "../uploads/" +
          box.url_img.replace(
            req.protocol + "://" + req.headers.host + "/private/",
            ""
          )

        fs.unlink(targetPath, (e) => {
          if (e) console.log(e)
        })
      }

      await prisma.box.update({
        where: {
          id: id
        },
        data: {
          name: name,
          comment: comment,
          id_room: id_room,
          state: state,
          url_img: url_img
        }
      })
    } else {
      await prisma.box.update({
        where: {
          id: id
        },
        data: {
          name: name,
          comment: comment,
          id_room: id_room,
          state: state
        }
      })
    }

    res.status(200).send("Requête effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = updateBox
