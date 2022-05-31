const { prisma } = require("../../prisma")

async function createTag(req, res) {
  try {
    //on récupère les données
    const id_user = req.auth.id
    const society_code = req.auth.society_code
    const name = req.body.name

    //Ajout du tag dans la db
    await prisma.tag.create({
      data: {
        id_user: id_user,
        name: name,
        society_code: society_code
      }
    })
    res.status(200).send("Ajout réussi")
  } catch (error) {
    console.log(error)
    return res.status(400).send("Une erreur est survenue")
  }
}
module.exports = createTag
