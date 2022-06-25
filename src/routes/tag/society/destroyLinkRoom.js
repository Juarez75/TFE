const { prisma } = require("../../../prisma")

async function destroyLinkRoom(req, res) {
  try {
    //on récupère les données envoyées
    const id_room = parseInt(req.body.id_room)

    //on supprime l'utilisateur dans la base de données
    await prisma.room.update({
      where: {
        id: id_room
      },
      data: {
        id_TagSociety: null
      }
    })
    res.status(200).send("Requête effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = destroyLinkRoom
