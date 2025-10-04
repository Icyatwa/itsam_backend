// importing database to use 
import database from "../backend/database.js";

const GetReview = async (req,res,next) => {
    try{
        // getting the product id 
        const {reviewid} = req.params

        // getting the product associated with the id from the database 
        const data = await database`
        select * from reviews where id = ${reviewid}
        `
        // setting the product 
        const review = data[0]

        res.status(200)
        res.json({"status":"OK","data":review})
        res.end()

    }catch(err){
        res.status(500)
        res.json({"error":"something wasnt right","message":err})
    }
}

export default GetReview