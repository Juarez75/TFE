const { prisma } = require("../../prisma")

async function deleteObject(req, res) {
  try {
    //on récupère les données
    const id_user = req.auth.id
    const id = req.body.id

    //vérification que c'est le bon utilisateur
    const object = await prisma.object.findUnique({
      where: {
        id: id
      }
    })
    if (id_user != object.id_user) {
      return res.status(403).send("BAD_REQUEST")
    }

    //on supprime l'objet de la base de données
    await prisma.object.delete({
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
module.exports = deleteObject
