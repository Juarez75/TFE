const { prisma } = require("../../prisma")

async function deleteObject(req, res) {
  try {
    //on supprime l'objet de la base de données
    const id = req.body.id
    await prisma.object.delete({
      where: {
        id: id
      }
    })
    res.status(200).send("Suppression effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = deleteObject
