const { prisma } = require("../../prisma")

async function listObject(req, res) {
  try {
    //on récupère tous les objets de l'utilisateur
    const id = req.auth.id
    const objects = await prisma.object.findMany({
      where: {
        id_user: id
      },
      include: {
        box: true
      }
    })
    res.status(200).send(objects)
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = listObject
