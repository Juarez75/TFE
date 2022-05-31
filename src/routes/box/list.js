const { prisma } = require("../../prisma")

async function listBox(req, res) {
  try {
    const id_user = req.auth.id
    //on récupère tuotes les boites de l'utilisateur
    const box = await prisma.box.findMany({
      where: {
        id_user: id_user
      },
      include: {
        room: true,
        TagOnBox: {
          include: {
            tag: true
          }
        }
      }
    })
    res.status(200).send(box)
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = listBox
