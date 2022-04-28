const { prisma } = require("../../prisma")

async function infoUser(req, res) {
  try {
    //on récupère l'id et on vérifie que c'est bien un nombre
    id = req.params.id
    const isaNumber = isNaN(req.params.id)
    if (isaNumber == true) {
      return res.status(403).send("Int attendu")
    }

    //on convertir le chiffre sous forme de string en int et on cherche dans la bdd
    id = parseInt(id)
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    })
    res.status(200).send(user)
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = infoUser
