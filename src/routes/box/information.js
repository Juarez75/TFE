const { prisma } = require("../../prisma")

async function infoBox(req, res) {
  try {
    const box = await prisma.room.findUnique({
      where: {
        id: req.params.id
      }
    })
    res.status(200).send(box)
  } catch (error) {
    console.log(error)
    res.status(400).send("Erreur")
  }
}
module.exports = infoBox
