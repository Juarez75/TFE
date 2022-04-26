const { prisma } = require("../../prisma")

async function deleteObject(req, res) {
  try {
    await prisma.object.delete({
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
module.exports = deleteObject
