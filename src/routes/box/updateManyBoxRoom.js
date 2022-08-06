const { prisma } = require("../../prisma")

async function updateManyBoxRoom(req, res) {
  try {
    const id_user = req.auth.id
    const list = req.body.list
    const id_room = parseInt(req.body.id_room)

    var box

    list.map(async (item) => {
      console.log(item)
      box = await prisma.box.findUnique({
        where: {
          id: item
        }
      })
      //vérification que c'est le bon utilisateur
      if (id_user != box.id_user) {
        return res.status(403).send("BAD_REQUEST")
      } else {
        //Si bon utilisateur on supprime la caisse
        await prisma.box.update({
          where: {
            id: item
          },
          data: {
            id_room: id_room
          }
        })
      }
    })

    res.status(200).send("Requête effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = updateManyBoxRoom
