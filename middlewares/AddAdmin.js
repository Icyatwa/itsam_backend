// importing the database
import database from "../backend/database.js";
import { encrypt, decrypt } from "encryptly";
import "dotenv/config";


// importing the uuid module
import { v4 as uuid } from "uuid";

const AddAdmin = async (req, res, next) => {
  try {
    const id = uuid();
    const encryptionKey = process.env.ENCRYPTION_KEY
    const { fullname, email } = req.body;
    const password = "admin";

    const encryptedPassword =  encrypt(password,encryptionKey)

    const databaseSave = await database`
    insert into admins (id,fullname,email,password,imageurl,superuser) values (${id},${fullname},${email},${encryptedPassword},'http://localhost:5000/images/admins/default','false')
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

export default AddAdmin;
