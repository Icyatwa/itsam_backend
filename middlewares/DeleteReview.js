// importing the database to be used
import database from "../backend/database.js";
import path from "path"
import {rm} from "fs"

const DeleteReview = async (req, res, next) => {
  try {
    const { reviewid } = req.params;
    const data = await database`
    delete from reviews where id = ${reviewid}
    `;

    const __dirname = path.resolve();
    const imageFileDir = path.join(__dirname, "images","reviews");

    rm(`${imageFileDir}/${reviewid}.jpg`, {force: true}, (err) => {
      if (err) {
        throw new Error(err);
      }
    });

    const imageFileDir2 = path.join(__dirname, "images","signatures");

    rm(`${imageFileDir}/${reviewid}.jpg`, {force: true}, (err) => {
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

export default DeleteReview
