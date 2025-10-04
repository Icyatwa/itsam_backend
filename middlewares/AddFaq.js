// importing the database
import database from "../backend/database.js";

// importing the uuid module
import { v4 as uuid } from "uuid";

const AddFaq = async (req, res, next) => {
  try {
    const id = uuid();
    const { question, answer } = req.body;


    const databaseSave = await database`
    insert into faqs (id,question,answer) values (${id},${question},${answer})
    `;

    res.status(200);
    res.json({ status: "OK", data: id });
    res.end();
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({ error: "something is not right", message: err });
    res.end();
  }
};

export default AddFaq;
