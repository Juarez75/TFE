const { prisma } = require("../../prisma")

async function emptyBox(req, res) {
  try {
    //on récupère les données
    const id = req.body.id
    const empty = req.body.empty
    const id_user = req.auth.id

    //vérification que c'est le bon utilisateur
    const box = await prisma.box.findUnique({
      where: {
        id: id
      }
    })
    if (id_user != box.id_user) {
      return res.status(403).send("BAD_REQUEST")
    }

    //on actualise les données dans la base de données
    await prisma.box.update({
      where: {
        id: id
      },
      data: {
        empty: empty
      }
    })
    res.status(200).send("Requête effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = emptyBox
