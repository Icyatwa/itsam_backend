// importing the database
import database from "../backend/database.js";
import { writeFile } from "fs";
import path from "path";
import "dotenv/config";
import { encrypt } from "encryptly";

const MakeSuperUser = async (req, res, next) => {
  try {
    const {adminid} = req.params
    const { superuser } = req.body;
    

    const databaseSave = await database`
    update admins set superuser = ${superuser} where id = ${adminid}
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

export default MakeSuperUser;
