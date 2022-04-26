const { prisma } = require("../../prisma")

async function updateObject(req, res) {
  try {
    await prisma.object.update({
      where: {
        id: req.body.id
      },
      data: {
        name: req.body.name
      }
    })
    res.status(200).send("Validé")
  } catch (error) {
    console.log(error)
    res.status(400).send("Erreur")
  }
}
module.exports = updateObject
