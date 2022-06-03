const { prisma } = require("../../prisma")

async function destroyLinkRoom(req, res) {
  try {
    //on récupère les données envoyées
    const id_tag = parseInt(req.body.id_tag)
    const id_room = parseInt(req.body.id_room)
    const id_room_id_tag = { id_room: id_room, id_tag: id_tag }

    //on supprime l'utilisateur dans la base de données
    await prisma.tagOnRoom.delete({
      where: {
        id_room_id_tag: id_room_id_tag
      }
    })
    res.status(200).send("Suppression effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = destroyLinkRoom
