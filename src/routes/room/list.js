const { prisma } = require("../../prisma")

async function listRoom(req, res) {
  try {
    const id = parseInt(req.params.id)
    const rooms = await prisma.room.findMany({
      where: {
        id_user: id
      }
    })
    res.status(200).send(rooms)
  } catch (error) {
    console.log(error)
    res.status(400).send("Erreur")
  }
}
module.exports = listRoom
