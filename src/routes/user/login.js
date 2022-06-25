const { prisma } = require("../../prisma")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function login(req, res) {
  try {
    //on récupère les données
    const mail = req.body.mail
    const password = req.body.password
    var color

    //On recherche dans la bdd le email donné par l'utilisateur
    const result = await prisma.user.findUnique({
      where: {
        mail: mail
      },
      include: {
        society: true
      }
    })

    //On vérifie si l'utilisateur existe avec son adresse email
    if (result == null) {
      return res.status(403).send("WRONG_LOGIN")
    }

    //On compare le mdp hashé de la DB et le mdp entré par l'utilisateur
    const exist = await bcrypt.compare(password, result.password)

    if (exist == false) {
      return res.status(403).send("WRONG_LOGIN")
    }
    const user = {
      id: result.id,
      type: result.type,
      id_society: result.id_society
    }
    if (result.id_society == null) color = "#707070"
    else color = result.society.color
    const data = {
      id: result.id,
      type: result.type,
      id_society: result.id_society,
      color: color
    }
    //on crée le token
    const token = jwt.sign(user, process.env.TOKEN_SECRET, {
      expiresIn: "3h"
    })
    //on répond à la requête tout en inscrivant le token dans ses cookies
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
    res.status(400).send("ERROR")
  }
}
module.exports = login
