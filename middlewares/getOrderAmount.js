import database from "../backend/database.js"

export default async function getOrderAmount(req,res){
    try{
        // setting the order code 
        const orderCode = req.params.ordercode
        // getting the price 
        const product = await database`
        select service from orders where id = ${orderCode} 
        `

        let serviceId
        if(product[0] !== undefined){
        serviceId = product[0].service
        }else{
        const error = {"error":"the purchase code is not valid"}
        return error
        }

        const service = await database`
        select price from products where id = ${serviceId} 
        `
        const purchaseAmount = parseInt(service[0].price)

        res.status(200);
        res.json({ status: "OK", data: purchaseAmount.toFixed(2) });
        res.end();
    }catch(err){
        console.log(err);
        res.status(500);
        res.json({ error: "something is not right", message: err });
        res.end();
    }
}