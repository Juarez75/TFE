const { prisma } = require("../../prisma")

async function createBox(req, res) {
  try {
    //on récupère les données
    const id_user = req.auth.id
    const name = req.body.name
    const comment = req.body.comment
    const id_room = req.body.id_room

    //vérification que c'est la pièce appartient bien à l'utilisateur
    const room = await prisma.room.findUnique({
      where: {
        id: id_room
      }
    })
    if (id_user != room.id_user) {
      return res.status(403).send("BAD_REQUEST")
    }

    //on ajoute la boite à la bdd
    const box = await prisma.box.create({
      data: {
        id_room: id_room,
        id_user: id_user,
        name: name,
        comment: comment
      }
    })
    res.status(200).send("Requête effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = createBox
