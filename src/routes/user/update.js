const { prisma } = require("../../prisma")
const Joi = require("joi")

async function updateUser(req, res) {
  try {
    //on récupère les données
    const id = req.body.id
    const mail = req.body.mail
    const firstname = req.body.firstname
    const lastname = req.body.lastname

    //on vérifie si l'email est valide
    const mailSchema = Joi.string().email().required()
    const validateMail = mailSchema.validate(mail)
    if (validateMail.error) {
      return res.status(403).send("E-mail invalide")
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
    res.status(200).send("Modification effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = updateUser
