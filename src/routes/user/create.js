const { prisma } = require("../../prisma")
const Joi = require("joi")
const bcrypt = require("bcrypt")

async function createUser(req, res) {
  try {
    //on récupère les données envoyées
    const password = req.body.password
    const mail = req.body.mail
    const firstname = req.body.firstname
    var lastname = req.body.lastname
    const typeUser = parseInt(req.body.type)
    const creator = "API"
    var society_code = parseInt(req.body.society_code)
    const societyUser = 1
    var existingSociety

    if (typeUser == 1) {
      society_code = Math.floor(Math.random() * 100000)
      lastname = "Society"
      do {
        existingSociety = await prisma.user.findMany({
          where: {
            type: typeUser,
            society_code: society_code
          }
        })
      } while (!existingSociety)
    }

    if (typeUser == 2 && !isNaN(society_code)) {
      const existingSociety = await prisma.user.findMany({
        where: {
          type: societyUser,
          society_code: society_code
        }
      })
      console.log(existingSociety)
      if (existingSociety.length == 0)
        return res.status(403).send("Code de société inexistant")
    }

    if (isNaN(society_code)) society_code = 0

    //on vérifie si l'email est valide
    const mailSchema = Joi.string().email().required()
    const validateMail = mailSchema.validate(mail)
    if (validateMail.error) {
      return res.status(403).send("E-mail invalide")
    }

    //on vérifie que l'email n'est pas déjà utilisé
    const existingUser = await prisma.user.findUnique({
      where: {
        mail: mail
      }
    })
    if (existingUser != null) {
      return res.status(403).send("L'email est déjà reliée à un autre compte")
    }

    //on hash le mdp
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    //on ajoute l'utilisateur à la bdd
    const user = await prisma.user.create({
      data: {
        mail: mail,
        password: hash,
        firstname: firstname,
        lastname: lastname,
        type: typeUser,
        creator: creator,
        society_code: society_code
      }
    })
    res.status(200).send(user)
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = createUser
