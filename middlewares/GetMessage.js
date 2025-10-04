// importing database to use 
import database from "../backend/database.js";

const GetMessage = async (req,res,next) => {
    try{
        // getting the product id 
        const {messageid} = req.params

        // getting the product associated with the id from the database 
        const data = await database`
        select * from messages where id = ${messageid}
        `
        // setting the product 
        const message = data[0]

        res.status(200)
        res.json({"status":"OK","data":message})
        res.end()

    }catch(err){
        res.status(500)
        res.json({"error":"something wasnt right","message":err})
    }
}

export default GetMessage