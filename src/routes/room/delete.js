const { prisma } = require("../../prisma")

async function deleteRoom(req, res) {
  try {
    //Suppression d'une pièce dans la bdd
    await prisma.room.delete({
      where: {
        id: req.body.id
      }
    })
    res.status(200).send("Suppression effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = deleteRoom
