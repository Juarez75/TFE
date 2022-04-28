const { prisma } = require("../../prisma")
const bcrypt = require("bcrypt")

async function login(req, res) {
  try {
    //on récupère les données
    const mail = req.body.mail
    const password = req.body.password

    //On recherche dans la bdd le email donné par l'utilisateur
    const result = await prisma.user.findUnique({
      where: {
        mail: mail
      }
    })

    //On vérifie si l'utilisateur existe avec son adresse email
    if (result == null) {
      return res
        .status(403)
        .send("Le nom d'utilisateur ou le mot de passe entré est incorrect")
    }

    //On vérifie si le mdp correspond bien à l'email donné
    const exist = await bcrypt.compare(password, result.password)
    if (exist == false) {
      return res
        .status(403)
        .send("Le nom d'utilisateur ou le mot de passe entré est incorrect")
    }
    const user = {
      id: result.id,
      mail: result.mail
    }
    res.status(200).send(user)
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = login
