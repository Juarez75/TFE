const { prisma } = require("../../prisma")

async function login(req, res) {
  try {
    const mail = req.body.mail
    const password = req.body.password
    //On recherche dans la bdd le email donné par l'utilisateur
    const result = await prisma.user.findUnique({
      where: {
        mail: mail
      }
    })
    //On vérifie si l'utilisateur existe avec son adresse email
    if (result != null) {
      const exist = password.localeCompare(result.password)
      //On vérifie si le mdp correspond bien à l'email donné
      if (exist == 0) {
        const user = {
          id: result.id,
          mail: result.mail
        }
        res.status(200).send(user)
      }
      //SI le mdp ne correspond pas, on envoie une erreur
      else {
        res
          .status(403)
          .send("Le nom d'utilisateur ou le mot de passe entré est incorrect")
      }
    }
    //Si l'adresse e-mail ne correspond pas, on prévient l'utilisateur
    else {
      res
        .status(403)
        .send("Le nom d'utilisateur ou le mot de passe entré est incorrect")
    }
  } catch (error) {
    console.log(error)
    res.status(400).send("Erreur")
  }
}
module.exports = login
