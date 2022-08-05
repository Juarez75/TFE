const { prisma } = require("../../prisma")

async function updateBox(req, res) {
  try {
    //on récupère les données
    const id = req.body.id
    const name = req.body.name
    const comment = req.body.comment
    const id_room = parseInt(req.body.id_room)
    const state = parseInt(req.body.state)

    //vérification que c'est le bon utilisateur
    const box = await prisma.box.findUnique({
      where: {
        id: id
      }
    })
    if (id_user != box.id_user) {
      return res.status(403).send("BAD_REQUEST")
    }

    //on actualise les données de la boite
    await prisma.box.update({
      where: {
        id: id
      },
      data: {
        name: name,
        comment: comment,
        id_room: id_room,
        state: state
      }
    })
    res.status(200).send("Requête effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = updateBox
