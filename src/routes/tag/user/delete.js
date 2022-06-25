const { prisma } = require("../../../prisma")

async function deleteTagUser(req, res) {
  try {
    //on récupère les données
    const id = parseInt(req.body.id)
    const id_user = req.auth.id

    //vérification que c'est le bon utilisateur
    const tag = await prisma.tagUser.findUnique({
      where: {
        id: id
      }
    })
    if (id_user != tag.id_user) {
      return res.status(403).send("BAD_REQUEST")
    }

    //Suppression du tag dans la bdd
    await prisma.tagUser.delete({
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
module.exports = deleteTagUser
