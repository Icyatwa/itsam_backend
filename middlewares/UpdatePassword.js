// importing the database
import database from "../backend/database.js";
import "dotenv/config";
import { encrypt, decrypt } from "encryptly";

const UpdatePassword = async (req, res, next) => {
  const encryptionKey = process.env.ENCRYPTION_KEY;
  try {
    const {adminid} = req.params
    const { oldpassword,newpassword } = req.body;

    const selectedPassword = await database`
    select password from admins where id = ${adminid}
    `;

    const oldPasswordFromDb = selectedPassword[0].password

    const decryptedPassword = decrypt(oldPasswordFromDb,encryptionKey)

    if(oldpassword === decryptedPassword){
      const encryptedPassword = encrypt(newpassword,encryptionKey)
      const databaseSave = await database`
    update admins set password = ${encryptedPassword} where id = ${adminid}
    `;

    res.status(200);
    res.json({ status: "OK", data: databaseSave });
    res.end();

    }else{
      throw new Error("passwords dont match")
    }

  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({ error: "something is not right", message: err });
    res.end();
  }
};

export default UpdatePassword;
