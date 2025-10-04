// importing the databse 
import database from "../backend/database.js";
// importing the uuid 
import { v4 as uuid } from "uuid";


const AddMessage = async(req,res,next)=>{
    // adding the data to the database 
    try{
        // generating the unique id 
        const id = uuid()
        // getting the form datas 
        const {telephone,names,email,message} = req.body

        const data = await database`
        insert into messages (id,telephone,names,email,message) values (${id},${telephone},${names},${email},${message})
        `
        res.status(201)
        res.json({'success':'added the message successfully'})
        res.end()
    }catch(err){
        res.status(500)
        res.json({'error':'failed to add the message','message':'failed to add the message to the database'})
        res.end()
    }
}

export default AddMessage