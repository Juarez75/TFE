const { prisma } = require("../../prisma")

async function deleteMany(req, res) {
  try {
    const id_user = req.auth.id
    const id_room = req.body.id_room
    const number = req.body.number
    var max

    //vérification que c'est le bon utilisateur
    const room = await prisma.room.findUnique({
      where: {
        id: id_room
      }
    })
    if (id_user != room.id_user) {
      return res.status(403).send("BAD_REQUEST")
    }

    const box = await prisma.box.findMany({
      where: {
        id_room: id_room
      },
      orderBy: {
        id: "asc"
      }
    })

    max = box.length
    if (number > max) return res.status(403).send("WRONG_NUMBER")
    max = max - 1
    for (var i = max; i > max - number; i--) {
      await prisma.box.delete({
        where: {
          id: box[i].id
        }
      })
    }

    res.status(200).send("Requête effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = deleteMany
