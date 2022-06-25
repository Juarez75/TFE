const { prisma } = require("../../prisma")
const Joi = require("joi")

async function updateUser(req, res) {
  try {
    //on récupère les données
    const id = req.auth.id
    const mail = req.body.mail
    const firstname = req.body.firstname
    const lastname = req.body.lastname

    //on vérifie si l'email est valide
    const mailSchema = Joi.string().email().required()
    const validateMail = mailSchema.validate(mail)
    if (validateMail.error) {
      return res.status(403).send("WRONG_MAIL")
    }

    //on vérifie que l'email n'est pas déjà utilisé par un autre utilisateur
    const existingUser = await prisma.user.findUnique({
      where: {
        mail: mail
      }
    })
    if (existingUser != null && existingUser.id != id) {
      return res.status(403).send("EXISTING_MAIL")
    }

    //on modifie les données dans la bdd
    await prisma.user.update({
      where: {
        id: id
      },
      data: {
        firstname: firstname,
        lastname: lastname,
        mail: mail
      }
    })
    res.status(200).send("Requête effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = updateUser
