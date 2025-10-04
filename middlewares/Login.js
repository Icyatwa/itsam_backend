// importing the database
import database from "../backend/database.js";
import { decrypt } from "encryptly";
import "dotenv/config";

const Login = async (req, res, next) => {
  const encryptionKey = process.env.ENCRYPTION_KEY;
  try {
    // getting form data
    const { name, password } = req.body;

    const response = await database`
    select * from admins where fullname=${name}
    `;

    if (response[0] !== undefined) {
      const passwordFromDb = response[0].password;
      const passwordFromDbDecrypted = decrypt(passwordFromDb, encryptionKey);
      if (passwordFromDbDecrypted === password) {
        res.status(200);
        const userData = {
          id: response[0].id,
          fullname: response[0].fullname,
          superuser: response[0].superuser,
        };
        res.json({ status: "ok", data: userData });
        res.end;
      } else {
        res.status(401);
        res.json({ error: "incorrect password" });
        res.end();
      }
    } else {
      res.status(400);
      res.json({ error: "user not found" });
      res.end();
    }
  } catch (err) {
    res.status(500);
    res.json({ error: err });
    res.end();
  }
};

export default Login;
