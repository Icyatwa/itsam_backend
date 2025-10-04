// importing the database to be used
import database from "../backend/database.js";
import path from "path"
import {rm} from "fs"

const DeleteCompany = async (req, res, next) => {
  try {
    const { companyid } = req.params;
    const data = await database`
    delete from companies where id = ${companyid}
    `;

    const __dirname = path.resolve();
    const imageFileDir = path.join(__dirname, "images","companies");

    rm(`${imageFileDir}/${companyid}.jpg`, {force: true}, (err) => {
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

export default DeleteCompany
