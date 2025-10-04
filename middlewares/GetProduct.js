// importing database to use 
import database from "../backend/database.js";

const GetProduct = async (req,res,next) => {
    try{
        // getting the product id 
        const {productid} = req.params

        // getting the product associated with the id from the database 
        const data = await database`
        select * from products where id = ${productid}
        `
        // setting the product 
        const product = data[0]

        res.status(200)
        res.json({"status":"OK","data":product})
        res.end()

    }catch(err){
        res.status(500)
        res.json({"error":"something wasnt right","message":err})
    }
}

export default GetProduct