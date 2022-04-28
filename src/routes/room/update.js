const { prisma } = require("../../prisma")

async function updateRoom(req, res) {
  try {
    //on récupère les données
    const id = req.body.id
    const name = req.body.name
    const comment = req.body.comment

    //on actualise les données dans la base de données
    await prisma.room.update({
      where: {
        id: id
      },
      data: {
        name: name,
        comment: comment
      }
    })
    res.status(200).send("Modification effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = updateRoom
