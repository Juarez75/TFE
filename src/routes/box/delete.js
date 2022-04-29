const { prisma } = require("../../prisma")

async function deleteBox(req, res) {
  try {
    const id_user = req.auth.id
    const id = req.body.id

    //vérification que c'est le bon utilisateur
    const box = await prisma.box.findUnique({
      where: {
        id: id
      }
    })
    if (id_user != box.id_user) {
      return res.status(403).send("Vous n'êtes pas autorisé à faire ceci")
    }

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
