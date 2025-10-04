// importing the database connection
import database from "../backend/database.js";

const GetProducts = async (req, res, next) => {
  // getting the list of available products
  try {
    const products = await database`
    select * from products
    `;
    res.status(200);
    res.json({'data': products }).end();
  } catch (err) {
    res.status(500);
    res
      .json({
        error: "failed to get products",
        message: "failed to get products due to some error",
      })
      .end();
  }
};

export default GetProducts;
