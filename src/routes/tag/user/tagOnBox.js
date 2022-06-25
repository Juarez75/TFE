const { prisma } = require("../../../prisma")

async function tagOnBox(req, res) {
  try {
    //on récupère les données
    const id_box = parseInt(req.params.id)

    //Ajout du tag dans la db
    const tag = await prisma.tagOnBox.findMany({
      where: {
        id_box: id_box
      },
      include: {
        tag: true
      }
    })
    res.status(200).send(tag)
  } catch (error) {
    console.log(error)
    return res.status(400).send("ERROR")
  }
}
module.exports = tagOnBox
