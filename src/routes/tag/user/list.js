const { prisma } = require("../../../prisma")

async function tagUser(req, res) {
  try {
    //on récupère les données
    const id_user = req.auth.id

    //Ajout du tag dans la db
    const tag = await prisma.tagUser.findMany({
      where: {
        id_user: id_user
      }
    })
    res.status(200).send(tag)
  } catch (error) {
    console.log(error)
    return res.status(400).send("ERROR")
  }
}
module.exports = tagUser
