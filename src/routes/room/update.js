const { prisma } = require("../../prisma")

async function updateRoom(req, res) {
  try {
    //on récupère les données
    const id = req.body.id
    const name = req.body.name
    const id_user = req.auth.id
    const type = parseInt(req.body.type)
    const stage = parseInt(req.body.stage)
    const tag = parseInt(req.body.tag)

    if (type == null) type = 0
    //vérification que c'est le bon utilisateur
    const room = await prisma.room.findUnique({
      where: {
        id: id
      }
    })
    if (id_user != room.id_user) {
      return res.status(403).send("BAD_REQUEST")
    }

    //on actualise les données dans la base de données
    if (isNaN(tag)) {
      await prisma.room.update({
        where: {
          id: id
        },
        data: {
          name: name,
          type: type,
          stage: stage
        }
      })
    } else {
      await prisma.room.update({
        where: {
          id: id
        },
        data: {
          name: name,
          type: type,
          stage: stage,
          id_TagSociety: tag
        }
      })
    }
    res.status(200).send("Requête effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = updateRoom
