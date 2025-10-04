// importing database to use 
import database from "../backend/database.js";

const GetCompany = async (req,res,next) => {
    try{
        // getting the product id 
        const {companyid} = req.params

        // getting the product associated with the id from the database 
        const data = await database`
        select * from companies where id = ${companyid}
        `
        // setting the product 
        const company = data[0]

        res.status(200)
        res.json({"status":"OK","data":company})
        res.end()

    }catch(err){
        res.status(500)
        res.json({"error":"something wasnt right","message":err})
    }
}

export default GetCompany