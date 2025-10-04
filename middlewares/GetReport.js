// importing database to use  
import database from "../backend/database.js";
import {writeFile, createWriteStream} from "fs"
import path from "path";
import { v4 as uuid } from "uuid";
import PDFDocument from "pdfkit";

const GetReport = async (req,res,next) => {
    try{
        const doc = new PDFDocument()
        
        const {from,to} = req.body
        console.log(from,to)
    // select the orders from the db 
        const reports  = await database`
        select * from orders where creation_date between ${from} and ${to} order by creation_date
        `

    // generate the file from selected records 
        const fileId = uuid()
        const __dirname = path.resolve();
        const fileDir = path.join(__dirname, "reports");
        const fileLocation = `${fileDir}/${fileId}.pdf`

        doc.pipe(createWriteStream(fileLocation));

        const dateOfGeneration = new Date()
        const reportHeader = `report generated on ${dateOfGeneration} \n\n\n\n`
        doc.fontSize(20).text(reportHeader)
        
        reports.forEach(order => {
            const contentToWrite = `order id = ${order.id} \n order status =${order.status} \n buyer name = ${order.name} \n buyer email = ${order.email} \n buyer telephone = ${order.telephone} \n service id = ${order.service} \n order creation date = ${order.creation_date} \n order payment date = ${order.payment_date} \n\n `

            doc.fontSize(15).text(contentToWrite)
        })

        doc.end()
    // send the file to the user 

    res.status(200)
    res.json({data:fileId})
    res.end()
    }catch(error){
        console.log(error)
        res.status(500)
        res.json({error:"failed to generate the report",message:error})
        res.end()
    }
}

export default GetReport