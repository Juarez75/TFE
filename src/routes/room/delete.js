const { prisma } = require("../../prisma")

async function deleteRoom(req, res) {
  try {
    //on récupère les données
    const id = req.body.id
    const id_user = req.auth.id

    //vérification que c'est le bon utilisateur
    const room = await prisma.room.findUnique({
      where: {
        id: id
      }
    })
    if (id_user != room.id_user) {
      return res.status(403).send("BAD_REQUEST")
    }

    //Suppression d'une pièce dans la bdd
    await prisma.room.delete({
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
module.exports = deleteRoom
