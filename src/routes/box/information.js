const { prisma } = require("../../prisma")

async function infoBox(req, res) {
  try {
    //on vérifie si l'id est bien un nombre et on le convertit en int
    id = req.params.id
    const isaNumber = isNaN(id)
    if (isaNumber == false) {
      return res.status(403).send("Int attendu")
    }
    const id = parseInt(id)

    //on recherche dans la bdd la boite
    const box = await prisma.box.findUnique({
      where: {
        id: id
      }
    })
    res.status(200).send(box)
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = infoBox
