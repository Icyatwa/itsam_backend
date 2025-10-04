// importing the database 
import database from "../backend/database.js";

const GetCompanies = async(req,res,next)=>{
    // getting the companies from the database 
    try{
        const companies = await database`
        select * from companies
        `

        res.status(200)
        res.json({'data':companies})
        res.end()
    }catch(err){
        res.status(500)
        res.json({'error':'failed to get the companies','message':'failed to get companies from the database'})
        res.end()
    }
}

export default GetCompanies