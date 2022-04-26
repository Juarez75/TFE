const { prisma } = require("../../prisma")

async function listObject(req, res) {
  try {
    const objects = await prisma.box.findMany({
      where: {
        id: req.body.id_user
      }
    })
    res.status(200).send(objects)
  } catch (error) {
    console.log(error)
    res.status(400).send("Erreur")
  }
}
module.exports = listObject
