const { prisma } = require("../../prisma")

async function infoRoom(req, res) {
  try {
    const isaNumber = isNaN(req.params.id)
    if (isaNumber == false) {
      const id = parseInt(req.params.id)
      const room = await prisma.room.findUnique({
        where: {
          id: id
        }
      })
      res.status(200).send(room)
    } else {
      res.status(403).send("Une erreur est survenue")
    }
  } catch (error) {
    console.log(error)
    res.status(400).send("Erreur")
  }
}
module.exports = infoRoom
