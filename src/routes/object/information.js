const { prisma } = require("../../prisma")

async function infoObject(req, res) {
  try {
    //on récuèpre les données
    id_user = req.auth.id
    id = req.params.id

    //on vérifie si l'id est bien un nombre et on le convertit en int
    const isaNumber = isNaN(id)
    if (isaNumber == true) {
      return res.status(403).send("WRONG_PAGE")
    }
    id = parseInt(id)

    //on recherche dans la bdd la boite
    const box = await prisma.object.findUnique({
      where: {
        id: id
      }
    })

    //on vérifie que c'est le bon utilisateur
    if (id_user != box.id_user) {
      return res.status(403).send("BAD_REQUEST")
    }
    res.status(200).send(box)
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = infoObject
