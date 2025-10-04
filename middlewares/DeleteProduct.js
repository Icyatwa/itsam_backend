// importing the database to be used
import database from "../backend/database.js";
import { unlink } from "fs";
import path from "path";

const DeleteProduct = async (req, res, next) => {
  try {
    const { productid } = req.params;
    const data = await database`
    delete from products where id = ${productid}
    `;

    const __dirname = path.resolve();
    const imageFileDir = path.join(__dirname, "images","products");

    unlink(`${imageFileDir}/${productid}.jpg`, (err) => {
      if (err) {
        throw new Error(err);
      }
    });

    res.status(204);
    res.end();
  } catch (err) {
    res.status(500);
    res.json({ "error": "failed to delete the product","message":err });
    res.end();
  }
};

export default DeleteProduct
