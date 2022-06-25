const { prisma } = require("../../prisma")

async function createMany(req, res) {
  try {
    const id_user = req.auth.id
    const number = parseInt(req.body.number)
    const id_room = req.body.id_room
    var max
    var name

    //vérification que c'est la pièce appartient bien à l'utilisateur
    const room = await prisma.room.findUnique({
      where: {
        id: id_room
      }
    })
    if (id_user != room.id_user) {
      return res.status(403).send("BAD_REQUEST")
    }
    //on compte le nombre de box que l'utilisateur a déjà
    var existBox = await prisma.box.count({
      where: {
        id_user: id_user
      }
    })
    max = number + existBox
    existBox = existBox + 1
    for (i = existBox; i <= max; i++) {
      name = "Box" + i
      await prisma.box.create({
        data: {
          id_room: id_room,
          id_user: id_user,
          name: name
        }
      })
    }
    res.status(200).send("Requête effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = createMany
