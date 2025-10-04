// importing the database
import database from "../backend/database.js";
import { writeFile } from "fs";
import path from "path";
import "dotenv/config";

// importing the uuid module
import { v4 as uuid } from "uuid";

const AddReview = async (req, res, next) => {
  try {
    const id = uuid()
    const date = new Date()
    const { name, description, instagramlink, } = req.body;
    const files = req.files;
    const url = process.env.BACKEND_URL;

    let imageurl, signatureurl

    files.forEach(file => {

      let uploadPath

      // assigning the file special url to the respective file
      if(file.fieldname === "signatureimage"){
        signatureurl = url + '/images/signatures/' + id;

        uploadPath = "signatures"
      }else if(file.fieldname === "reviewerimage"){
        imageurl = url + '/images/reviews/' + id;

        uploadPath = "reviews"
      }

      // creating the path to the image file
      const __dirname = path.resolve();
      const imageFileDir = path.join(__dirname, "images",uploadPath);
      const fileNameParts = file.originalname.split(".");
      const fileExtension = fileNameParts[fileNameParts.length - 1];
      const fullFileName = id + '.' + fileExtension;
      const fileNamePath = path.join(imageFileDir, fullFileName);


      if(!existsSync(imageFileDir)){
        mkdirSync(imageFileDir)
      }
      // uploading file to the server
      writeFile(fileNamePath, file.buffer,(err)=>{
          if(err){
              throw new Error(err)
          }
      });
    })

    const databaseSave = await database`
    insert into reviews (id,name,description,instagramlink,imageurl,signatureurl,date) values (${id},${name},${description},${instagramlink},${imageurl},${signatureurl},${date})
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

export default AddReview;
