const { prisma } = require("../../../prisma")

async function deleteTagSociety(req, res) {
  try {
    //on récupère les données
    const id = parseInt(req.body.id)
    const id_society = req.auth.id_society

    //vérification que c'est le bon utilisateur
    const tag = await prisma.tagSociety.findUnique({
      where: {
        id: id
      }
    })
    if (id_society != tag.id_society) {
      return res.status(403).send("BAD_REQUEST")
    }

    //Suppression d'une pièce dans la bdd
    await prisma.tagSociety.delete({
      where: {
        id: id
      }
    })
    res.status(200).send("Requête effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = deleteTagSociety
