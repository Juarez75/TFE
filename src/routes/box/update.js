const { prisma } = require("../../prisma")

async function updateBox(req, res) {
  try {
    await prisma.box.update({
      where: {
        id: req.body.id
      },
      data: {
        name: req.body.name,
        comment: req.body.comment
      }
    })
    res.status(200).send("Validé")
  } catch (error) {
    console.log(error)
    res.status(400).send("Erreur")
  }
}
module.exports = updateBox
