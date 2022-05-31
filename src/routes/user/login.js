const { prisma } = require("../../prisma")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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
      type: result.type,
      society_code: result.society_code
    }
    const data = {
      id: result.id,
      type: result.type,
      society_code: result.society_code,
      color: result.color
    }
    const token = jwt.sign(user, process.env.TOKEN_SECRET, {
      expiresIn: "3h"
    })
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        expires: new Date(Date.now() + 3 * 3600000)
      })
      .status(200)
      .send(data)
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = login
