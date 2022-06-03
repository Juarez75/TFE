const { prisma } = require("../../prisma")

async function linkroom(req, res) {
  try {
    //on récupère les données
    const id_room = parseInt(req.body.id_room)
    const id_tag = parseInt(req.body.id_tag)

    //Ajout du tag dans la db
    await prisma.tagOnRoom.create({
      data: {
        id_room: id_room,
        id_tag: id_tag
      }
    })
    res.status(200).send("Ajout réussi")
  } catch (error) {
    console.log(error)
    return res.status(400).send("Une erreur est survenue")
  }
}
module.exports = linkroom
