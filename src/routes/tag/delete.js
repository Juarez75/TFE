const { prisma } = require("../../prisma")

async function deleteTag(req, res) {
  try {
    //on récupère les données
    const id = parseInt(req.body.id)
    const id_user = req.auth.id
    //vérification que c'est le bon utilisateur
    const tag = await prisma.tag.findUnique({
      where: {
        id: id
      }
    })
    if (id_user != tag.id_user) {
      return res.status(403).send("Vous n'êtes pas autorisé à faire ceci")
    }
    //Suppression d'une pièce dans la bdd
    await prisma.tag.delete({
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
module.exports = deleteTag
