// importing the database to be used
import database from "../backend/database.js";
import { rm } from "fs";
import path from "path";

const DeleteBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;

    const data = await database`
    delete from blogs where id = ${blogid}
    `;

    const __dirname = path.resolve();
    const blogFileDir = path.join(__dirname, "blogFiles");
    const imageFileDir = path.join(__dirname, "images", "blogs");

    rm(`${blogFileDir}/${blogid}.json`,{force: true}, (err) => {
      if (err) {
        throw new Error(err);
      }
    });

    rm(`${imageFileDir}/${blogid}.jpg`,{force: true}, (err) => {
      if (err) {
        throw new Error(err);
      }
    });

    res.status(204);
    res.end();
  } catch (err) {
    res.status(500);
    res.json({ "error": "failed to delete the blog","message":err });
    res.end();
  }
};

export default DeleteBlog
