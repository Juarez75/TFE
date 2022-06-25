const { prisma } = require("../../prisma")

async function infoRoom(req, res) {
  try {
    const id = parseInt(req.params.id)
    const id_user = req.auth.id
    //on vérifie que c'est bien un nombre et on le convertit
    if (isNaN(id)) {
      return res.status(403).send("WRONG_PAGE")
    }

    //on récupère les données dans la bdd
    const room = await prisma.room.findUnique({
      where: {
        id: id
      },
      include: {
        TagSociety: true
      }
    })
    if (id_user != room.id_user) {
      return res.status(403).send("BAD_REQUEST")
    }
    res.status(200).send(room)
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = infoRoom
