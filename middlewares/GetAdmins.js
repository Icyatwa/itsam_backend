// importing the database 
import database from "../backend/database.js";

const GetAdmins = async(req,res,next)=>{
    // getting the companies from the database 
    try{
        const admins = await database`
        select * from admins
        `

        res.status(200)
        res.json({'data':admins})
        res.end()
    }catch(err){
        res.status(500)
        res.json({'error':'failed to get the admins','message':'failed to get admins from the database'})
        res.end()
    }
}

export default GetAdmins