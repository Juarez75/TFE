const { prisma } = require("../../prisma")

async function createObject(req, res) {
  try {
    //on récupère les données
    const id_box = req.body.id_box
    const id_user = req.body.id_user
    const name = req.body.name

    //on ajoute l'objet dans la bdd
    await prisma.object.create({
      data: {
        id_box: id_box,
        id_user: id_user,
        name: name
      }
    })
    res.status(200).send("Ajout effectué")
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = createObject
