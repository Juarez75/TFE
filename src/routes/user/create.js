const { prisma } = require("../../prisma")
const Joi = require("joi")
const bcrypt = require("bcrypt")

async function createUser(req, res) {
  try {
    const password = req.body.password
    const mail = req.body.mail
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const typeUser = 0
    const creator = "API"

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
      return res.status(403).send("L'email a déjà un compte")
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
        creator: creator
      }
    })
    res.status(200).send(user)
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur s'est produite")
  }
}
module.exports = createUser
