const { prisma } = require("../../prisma")

async function updateObject(req, res) {
  try {
    //On actualise le nom de l'objet
    const id = req.body.id
    const name = req.body.name
    await prisma.object.update({
      where: {
        id: id
      },
      data: {
        name: name
      }
    })
    res.status(200).send("Modification effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = updateObject
