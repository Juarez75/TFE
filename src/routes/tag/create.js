const { prisma } = require("../../prisma")

async function createTag(req, res) {
  try {
    //on récupère les données
    const id_user = req.auth.id
    const society_code = req.auth.society_code
    const type = req.auth.type
    const name = req.body.name

    if (type == 1) {
      const color = req.body.color
      await prisma.tag.create({
        data: {
          id_user: id_user,
          name: name,
          society_code: society_code,
          color: color
        }
      })
    } else {
      await prisma.tag.create({
        data: {
          id_user: id_user,
          name: name,
          society_code: 0
        }
      })
    }

    res.status(200).send("Ajout réussi")
  } catch (error) {
    console.log(error)
    return res.status(400).send("Une erreur est survenue")
  }
}
module.exports = createTag
