// importing the database
import database from "../backend/database.js";
import "dotenv/config";

// importing the uuid module
import { v4 as uuid } from "uuid";

const UpdateFaq = async (req, res, next) => {
  try {
    const {faqid} = req.params
    const { question, answer } = req.body;

    const databaseSave = await database`
    update faqs set question = ${question},answer = ${answer} where id = ${faqid}
    `;

    res.status(200);
    res.json({ status: "OK", data: databaseSave });
    res.end();

  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({ error: "something is not right", message: err });
    res.end();
  }
};

export default UpdateFaq;
