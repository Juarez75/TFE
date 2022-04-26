const { prisma } = require("../../prisma")

async function createObject(req, res) {
  try {
    await prisma.object.create({
      data: {
        id_room: req.body.id_box,
        id_user: req.body.id_user,
        name: req.body.name
      }
    })
    res.status(200).send("Validé")
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur s'est produite")
  }
}
module.exports = createObject
