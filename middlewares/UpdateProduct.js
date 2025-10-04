// importing the database
import database from "../backend/database.js";
import { writeFile } from "fs";
import path from "path";
import "dotenv/config";

// importing the uuid module
import { v4 as uuid } from "uuid";

const UpdateProduct = async (req, res, next) => {
  try {
    const {productid} = req.params
    const { productname, productprice } = req.body;
    const productpricenum = parseInt(productprice)
    const file = req.files[0];
    const url = process.env.BACKEND_URL;

    // creating the path to the image file
    const __dirname = path.resolve();
    const imageFileDir = path.join(__dirname, "images","products");
    const fileNameParts = file.originalname.split(".");
    const fileExtension = fileNameParts[fileNameParts.length - 1];
    const fullFileName = productid + '.' + fileExtension;
    const fileNamePath = path.join(imageFileDir, fullFileName);

    // file name to upload to the database 
    const fileUploadUrl = url + '/images/products/' + productid;

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
    update products set name = ${productname},price = ${productpricenum},imageurl = ${fileUploadUrl} where id = ${productid}
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

export default UpdateProduct;
