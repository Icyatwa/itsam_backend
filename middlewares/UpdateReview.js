// importing the database
import database from "../backend/database.js";
import { writeFile } from "fs";
import path from "path";
import "dotenv/config";

// importing the uuid module
import { v4 as uuid } from "uuid";

const UpdateReview = async (req, res, next) => {
  try {
    const {reviewid} = req.params
    const id = reviewid
    const { name, description, instagramlink } = req.body;
    const files = req.files;
    const url = process.env.BACKEND_URL;
    const date = new Date()

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

      // assigning the file special url to the respective file
      if(file.fieldname === "signatureimage"){
        signatureurl = url + '/images/reviews/' + id;
      }else if(file.fieldname === "reviewerimage"){
        imageurl = url + '/images/reviews/' + id;
      }

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
    update reviews set name = ${name},description = ${description}, instagramlink=${instagramlink}, imageurl=${imageurl}, signatureurl=${signatureurl}, date=${date} where id = ${id}
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

export default UpdateReview;
