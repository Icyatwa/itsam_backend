// importing the database to be used
import database from "../backend/database.js";
import path from "path";
import { rm } from "fs";

const DeleteAdmin = async (req, res, next) => {
  try {
    const { adminid } = req.params;
    const { userId, superuser } = req.body;
    const superUser = superuser === "true"?true:false

    if(adminid === userId){
      res.status(500)
      res.json({error:"you cant delete your self"})
      res.end()
      return
    }

    if (superUser === true) {
      console.log("comenced to user checking that is in the database");
      const data = await database`
      select superuser from admins where id=${adminid}
      `;
      if (data.length !== 0) {
        console.log("admin to be deleted is found in the database")
        let userStatus = data[0].superuser;
        userStatus = userStatus === "true" ? true : false;

        if (userStatus !== true) {
          console.log("admin to be deleted is not a super admin")
          const data = await database`
            delete from admins where id = ${adminid}
          `;

          console.log("admin to be deleted is removed")

          const __dirname = path.resolve();
          const imageFileDir = path.join(__dirname, "images", "admins");

          rm(`${imageFileDir}/${adminid}.jpg`, { force: true }, (err) => {
            if (err) {
              throw new Error(err);
            }
          });

          res.status(204);
          res.end();
        } else {
          throw new Error("you can not delete a super user");
        }
      } else {
        throw new Error("the user to be deleted doesnt exist");
      }
    }else{
      throw new Error("you dont have permission to delete other admins");
    }
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({ error: "failed to delete the admin", message: err });
    res.end();
  }
};

export default DeleteAdmin;
