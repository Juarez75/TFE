const { prisma } = require("../../prisma")

async function updateObject(req, res) {
  try {
    //on récupère les données
    const id = req.body.id
    const name = req.body.name
    const id_user = req.auth.id

    //vérification que c'est le bon utilisateur
    const object = await prisma.object.findUnique({
      where: {
        id: id
      }
    })
    if (id_user != object.id_user) {
      return res.status(403).send("Vous n'êtes pas autorisé à faire ceci")
    }

    //On actualise le nom de l'objet
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
