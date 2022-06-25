const { prisma } = require("../../prisma")
const jwt = require("jsonwebtoken")

async function createRoom(req, res) {
  try {
    //on récupère les données
    const id_user = req.auth.id
    const name = req.body.name
    var type = parseInt(req.body.type)
    const stage = parseInt(req.body.stage)
    const tag = parseInt(req.body.tag)
    var room
    if (isNaN(type)) type = 0
    //Ajout d'une pièce dans la bdd
    if (isNaN(tag)) {
      room = await prisma.room.create({
        data: {
          id_user: id_user,
          name: name,
          type: type,
          stage: stage
        }
      })
    } else {
      room = await prisma.room.create({
        data: {
          id_user: id_user,
          name: name,
          type: type,
          stage: stage,
          id_TagSociety: tag
        }
      })
    }
    res.status(200).send("Requête effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = createRoom
