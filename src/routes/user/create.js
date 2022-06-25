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
    const societyUser = 1
    const id_society = parseInt(req.body.id_society)
    var existingSociety
    var user

    //on vérifie que la société existe
    if (typeUser == 2 && !isNaN(id_society)) {
      const existingSociety = await prisma.society.findUnique({
        where: {
          id: id_society
        }
      })
      if (existingSociety == null) return res.status(403).send("WRONG_SOCIETY")
    }

    //on vérifie si l'email est valide
    const mailSchema = Joi.string().email().required()
    const validateMail = mailSchema.validate(mail)
    if (validateMail.error) {
      return res.status(403).send("WRONG_MAIL")
    }

    //on vérifie que l'email n'est pas déjà utilisé
    const existingUser = await prisma.user.findUnique({
      where: {
        mail: mail
      }
    })
    if (existingUser != null) {
      return res.status(403).send("EXISTING_MAIL")
    }

    const salt = await bcrypt.genSalt(10) //le nombre de fois qu'il sera salé
    const hash = await bcrypt.hash(password, salt) //le mot de passe est hashé
    console.log(id_society)
    // on ajoute un utilisateur non lié à une société
    if (isNaN(id_society) && typeUser != societyUser) {
      user = await prisma.user.create({
        data: {
          mail: mail,
          password: hash,
          firstname: firstname,
          lastname: lastname,
          type: typeUser
        }
      })
    } else if (!isNaN(id_society) && typeUser != societyUser) {
      user = await prisma.user.create({
        data: {
          mail: mail,
          password: hash,
          firstname: firstname,
          lastname: lastname,
          type: typeUser,
          id_society: id_society
        }
      })
    } else if (typeUser == societyUser) {
      const society = await prisma.society.create({
        data: {
          color: "#212529"
        }
      })
      user = await prisma.user.create({
        data: {
          mail: mail,
          password: hash,
          firstname: firstname,
          lastname: lastname,
          type: typeUser,
          id_society: society.id
        }
      })
    }

    res.status(200).send(user)
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = createUser
