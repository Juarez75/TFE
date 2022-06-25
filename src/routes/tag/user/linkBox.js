const { prisma } = require("../../../prisma")

async function linkBox(req, res) {
  try {
    //on récupère les données
    const id_box = parseInt(req.body.id_box)
    const id_tag = parseInt(req.body.id_tag)

    //Ajout du tag dans la db
    await prisma.tagOnBox.create({
      data: {
        id_box: id_box,
        id_tag: id_tag
      }
    })
    res.status(200).send("Requête effectuée")
  } catch (error) {
    console.log(error)
    return res.status(400).send("ERROR")
  }
}
module.exports = linkBox
