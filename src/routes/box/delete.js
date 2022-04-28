const { prisma } = require("../../prisma")

async function deleteBox(req, res) {
  try {
    const id = req.body.id
    //on supprime la boite de la bdd
    await prisma.box.delete({
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
module.exports = deleteBox
