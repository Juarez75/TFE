const { prisma } = require("../../../prisma")

async function societyTag(req, res) {
  try {
    //on récupère les données
    const id_society = req.auth.id_society

    //Ajout du tag dans la db
    const tag = await prisma.tagSociety.findMany({
      where: {
        id_society: id_society
      }
    })
    res.status(200).send(tag)
  } catch (error) {
    console.log(error)
    return res.status(400).send("ERROR")
  }
}
module.exports = societyTag
