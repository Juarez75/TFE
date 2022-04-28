const { prisma } = require("../../prisma")

async function deleteUser(req, res) {
  try {
    //on récupère les données envoyées
    const id = req.body.id
    //on supprime l'utilisateur dans la base de données
    await prisma.user.delete({
      where: {
        id: req.body.id
      }
    })
    res.status(200).send("Suppression effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = deleteUser
