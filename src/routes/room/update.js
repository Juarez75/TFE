const { prisma } = require("../../prisma")

async function updateRoom(req, res) {
  try {
    //on récupère les données
    const id = req.body.id
    const name = req.body.name
    const comment = req.body.comment
    const id_user = req.auth.id
    const type = parseInt(req.body.type)
    const stage = parseInt(req.body.stage)

    if (type == null) type = 0
    //vérification que c'est le bon utilisateur
    const room = await prisma.room.findUnique({
      where: {
        id: id
      }
    })
    if (id_user != room.id_user) {
      return res.status(403).send("Vous n'êtes pas autorisé à faire ceci")
    }

    //on actualise les données dans la base de données
    await prisma.room.update({
      where: {
        id: id
      },
      data: {
        name: name,
        comment: comment,
        type: type,
        stage: stage
      }
    })
    res.status(200).send("Modification effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = updateRoom
