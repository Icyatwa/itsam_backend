// importing the database to be used 
import database from "../backend/database.js";

const GetReviews = async(req,res,next)=>{
    // getting the reviews from the database 
    try{
        const reviews = await database`
        select * from reviews order by date
        `

        res.status(200)
        res.json({'data':reviews})
        res.end()
    }catch(err){
        res.status(500)
        res.json({'error':'failed to get some reviews','message':'failed to get reviews for the database'})
        res.end()
    }
}

export default GetReviews