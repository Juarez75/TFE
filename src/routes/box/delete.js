const { prisma } = require("../../prisma")

async function deleteBox(req, res) {
  try {
    await prisma.box.delete({
      where: {
        id: req.body.id
      }
    })
    res.status(200).send("Validé")
  } catch (error) {
    console.log(error)
    res.status(400).send("Erreur")
  }
}
module.exports = deleteBox
