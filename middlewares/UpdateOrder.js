// importing the database
import database from "../backend/database.js";
import "dotenv/config";

// importing the uuid module
import { v4 as uuid } from "uuid";

const UpdateOrder = async (req, res, next) => {
  try {
    const {orderid} = req.params
    const status = "paid"
        const orders = await database`
        update orders set status=${status}  where id = ${orderid}
        `

    console.log('order id => ',orderid)
    console.log('updated orders => ',orders)

    res.status(200);
    res.json({ status: "OK", data: orders });
    res.end();

  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({ error: "something is not right", message: err });
    res.end();
  }
};

export default UpdateOrder;
