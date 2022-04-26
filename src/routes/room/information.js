const { prisma } = require("../../prisma")

async function infoRoom(req, res)
{
    try{
        const room = await prisma.room.findUnique({
            where:{
                id: req.body.id
            }
        })
        res.status(200).send(room)
    }
    catch(error){
        console.log(error)
        res.status(400).send("Erreur")
    }
}
module.exports= infoRoom