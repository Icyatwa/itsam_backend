// importing database to use 
import database from "../backend/database.js";

const GetAdmin = async (req,res,next) => {
    try{
        // getting the product id 
        const {adminid} = req.params

        // getting the product associated with the id from the database 
        const data = await database`
        select id,fullname,email,imageurl,superuser from admins where id = ${adminid}
        `
        // setting the product 
        const admin = data[0]

        res.status(200)
        res.json({"status":"OK","data":admin})
        res.end()

    }catch(err){
        res.status(500)
        res.json({"error":"something wasnt right","message":err})
    }
}

export default GetAdmin