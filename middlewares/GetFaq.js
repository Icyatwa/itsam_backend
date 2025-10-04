// importing database to use 
import database from "../backend/database.js";

const GetFaq = async (req,res,next) => {
    try{
        // getting the product id 
        const {faqid} = req.params

        // getting the product associated with the id from the database 
        const data = await database`
        select * from faqs where id = ${faqid}
        `
        // setting the product 
        const faq = data[0]

        res.status(200)
        res.json({"status":"OK","data":faq})
        res.end()

    }catch(err){
        res.status(500)
        res.json({"error":"something wasnt right","message":err})
    }
}

export default GetFaq