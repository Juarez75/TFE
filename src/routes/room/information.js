const { prisma } = require("../../prisma")

async function infoRoom(req, res) {
  try {
    id = req.params.id
    //on vérifie que c'est bien un nombre et on le convertit
    const isaNumber = isNaN(id)
    if (isaNumber == true) {
      return res.status(403).send("Int attendu")
    }
    id = parseInt(id)

    //on récupère les données dans la bdd
    const room = await prisma.room.findUnique({
      where: {
        id: id
      }
    })
    res.status(200).send(room)
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = infoRoom
