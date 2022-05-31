const { prisma } = require("../../prisma")

async function userTag(req, res) {
  try {
    //on récupère les données
    const id_user = req.auth.id

    //Ajout du tag dans la db
    const tag = await prisma.tag.findMany({
      where: {
        id_user: id_user
      }
    })
    res.status(200).send(tag)
  } catch (error) {
    console.log(error)
    return res.status(400).send("Une erreur est survenue")
  }
}
module.exports = userTag
