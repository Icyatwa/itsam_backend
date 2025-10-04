// importing databse connection 
import database from "../backend/database.js";
// importing nanoid for generating random unique identifiers 
import { customAlphabet } from "nanoid";

const InsertOrder = async(req,res,next)=>{    
    try{
        // generating id 
        const nanoid = customAlphabet("1234567890abcdefg",10)
        const id = nanoid(5)

        // gettign the form data sent 
        const userData = req.body

        // getting the values to insert in database 
        const name = userData.names
        const email = userData.email
        const telephone = userData.telephone
        const service = userData.serviceid
        const status = "not paid"
        const date = new Date()

        // adding them to the database 
        const user = await database`
        insert into orders (id,name,email,telephone,service,status,creation_date) values (${id},${name},${email},${telephone},${service},${status},${date})
        `

        res.status(201)
        res.json({'success':'user created successful','message':'the order is created and inserted into the databse','data':id})
        res.end()
    }catch(err){
        console.log(err)
        res.status(500)
        res.json({'error':'error happened on our end','message':err}).end()
    }
    
}

export default InsertOrder