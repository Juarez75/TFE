const { prisma } = require("../../../prisma")

async function destroyLinkBox(req, res) {
  try {
    //on récupère les données envoyées
    const id_tag = parseInt(req.body.id_tag)
    const id_box = parseInt(req.body.id_box)
    const id_box_id_tag = { id_box: id_box, id_tag: id_tag }

    //on supprime l'utilisateur dans la base de données
    await prisma.tagOnBox.delete({
      where: {
        id_box_id_tag: id_box_id_tag
      }
    })
    res.status(200).send("Requête effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = destroyLinkBox
