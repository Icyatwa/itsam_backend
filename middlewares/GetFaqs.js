// importing database to use  
import database from "../backend/database.js";

const GetFaqs = async(req,res,next)=>{
    // getting the faqs from the database 
    try{
        const data = await database`
        select * from faqs
        `
        res.status(200)
        res.json({'data':data})
        res.end()
    }catch(err){
        res.status(500)
        res.json({'error':'internal server error','message':'some pronlem happened on our end'})
        res.end()
    }
}

export default GetFaqs