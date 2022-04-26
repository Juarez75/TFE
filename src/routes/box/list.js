const { prisma } = require("../../prisma")

async function listBox(req, res)
{
    try{
        const box = await prisma.box.findMany({
            where:{
                id: req.body.id_user
            }
        })
        res.status(200).send(box)
    }
    catch(error){
        console.log(error)
        res.status(400).send("Erreur")
    }
}
module.exports= listBox