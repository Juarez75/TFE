const { prisma } = require("../../prisma")

async function createMany(req, res) {
  try {
    const id_user = req.auth.id
    const addBox = parseInt(req.body.number)
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
    var i = 0
    var existBox
    do {
      var lastBox = await prisma.box.findFirst({
        skip: i,
        where: {
          id_user: id_user,
          name: { startsWith: `Caisse_` }
        },
        orderBy: {
          creation_date: "desc"
        }
      })
      if (lastBox == null) existBox = 1
      else existBox = parseInt(lastBox.name.replace("Caisse_", "")) + 1
      i++
    } while (isNaN(existBox))

    max = addBox + existBox - 1
    for (i = existBox; i <= max; i++) {
      name = "Caisse_" + i
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
