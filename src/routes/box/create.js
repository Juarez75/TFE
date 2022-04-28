const { prisma } = require("../../prisma")

async function createBox(req, res) {
  try {
    //on récupère les données
    const id_user = req.body.id
    const name = req.body.name
    const comment = req.body.comment
    const id_room = req.body.id_room

    //on ajoute la boite à la bdd
    const box = await prisma.box.create({
      data: {
        id_room: id_room,
        id_user: id_user,
        name: name,
        comment: comment
      }
    })
    res.status(200).send(box)
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = createBox
