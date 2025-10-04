// importing the database
import database from "../backend/database.js";
import { existsSync, mkdirSync, writeFile } from "fs";
import path from "path";
import "dotenv/config";

// importing the uuid module
import { v4 as uuid } from "uuid";

const AddBlog = async (req, res, next) => {
  try {
    const id = uuid();
    const { title, author, blogContent } = req.body;


    const date = new Date()
    const file = req.files[0];
    const url = process.env.BACKEND_URL;

    // creating the path to the image file
    const __dirname = path.resolve();
    const imageFileDir = path.join(__dirname, "images","blogs");
    const fileNameParts = file.originalname.split(".");
    const fileExtension = fileNameParts[fileNameParts.length - 1];
    const fullFileName = id + '.' + fileExtension;
    const fileNamePath = path.join(imageFileDir, fullFileName);

    // adding the blogfile 
    const blogFileDir = path.join(__dirname, "blogFiles");
    const blogFileName = id + '.' + 'json';
    const blogFilePath = path.join(blogFileDir, blogFileName);

    const parsedData = JSON.parse(blogContent)
    const data = {
      blogData: parsedData
    }

    if(!existsSync(blogFileDir)){
      mkdirSync(blogFileDir)
    }

    writeFile(blogFilePath, JSON.stringify(data,(null,2)),(err)=>{
      if(err){
          throw new Error(err)
      }
    });
    // file name to upload to the database 
    const fileUploadUrl = url + '/images/blogs/' + id;

    if(!existsSync(imageFileDir)){
      mkdirSync(imageFileDir)
    }

    // uploading file to the server
    writeFile(fileNamePath, file.buffer,(err)=>{
        if(err){
            throw new Error(err)
        }
    });

    const databaseSave = await database`
    insert into blogs (id,title,date,author,content,imageurl) values (${id},${title},${date},${author},${id},${fileUploadUrl})
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

export default AddBlog;
