const { prisma } = require("../../prisma")

async function societyTag(req, res) {
  try {
    //on récupère les données
    const society_code = req.auth.society_code

    //Ajout du tag dans la db
    const tag = await prisma.tag.findMany({
      where: {
        society_code: society_code
      }
    })
    res.status(200).send(tag)
  } catch (error) {
    console.log(error)
    return res.status(400).send("Une erreur est survenue")
  }
}
module.exports = societyTag
