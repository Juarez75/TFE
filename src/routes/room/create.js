const { prisma } = require("../../prisma")
const jwt = require("jsonwebtoken")

async function createRoom(req, res) {
  try {
    //on récupère les données
    const id_user = req.auth.id
    const name = req.body.name
    const comment = req.body.comment
    const type = parseInt(req.body.type)

    if (type == null) type = 0
    //Ajout d'une pièce dans la bdd
    const room = await prisma.room.create({
      data: {
        id_user: id_user,
        name: name,
        comment: comment,
        type: type
      }
    })
    res.status(200).send(room)
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = createRoom
