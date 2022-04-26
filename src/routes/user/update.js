const { prisma } = require("../../prisma")

async function updateUser(req,res){
    try{
        await prisma.user.update({
            where:{
                id: req.body.id
            },
            data: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                mail: req.body.mail
            }
        })
        res.status(200).send("Validé")
    }
    catch(error){
        console.log(error)
        res.status(400).send("Erreur")
    }
}
module.exports= updateUser