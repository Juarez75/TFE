const { prisma } = require("../../prisma")

async function updateBox(req, res) {
  try {
    //on récupère les données
    const id = req.body.id
    const name = req.body.name
    const comment = req.body.comment

    //vérification que c'est le bon utilisateur
    const box = await prisma.box.findUnique({
      where: {
        id: id
      }
    })
    if (id_user != box.id_user) {
      return res.status(403).send("Vous n'êtes pas autorisé à faire ceci")
    }

    //on actualise les données de la boite
    await prisma.box.update({
      where: {
        id: id
      },
      data: {
        name: name,
        comment: comment
      }
    })
    res.status(200).send("Modification effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = updateBox
