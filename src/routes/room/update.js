const { prisma } = require("../../prisma")

async function updateRoom(req,res){
    try{
        await prisma.room.update({
            where:{
                id: req.body.id
            },
            data: {
                name: req.body.name,
                comment: req.body.comment
            }
        })
        res.status(200).send("Validé")
    }
    catch(error){
        console.log(error)
        res.status(400).send("Erreur")
    }
}
module.exports= updateRoom