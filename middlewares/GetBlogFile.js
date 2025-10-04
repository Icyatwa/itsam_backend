import path from "path";
import fs from "fs";

// function to get the blog file and send the content to the user
const GetBlogFile = async (req, res, next) => {
  
  try {
    // getting the file name
    const { filename } = req.params;

    // creating the path to the blog file
    const __dirname = path.resolve();
    const blogFileDir = path.join(__dirname, "blogFiles");

    // reading the contents of the blog file 
    const data = fs.readFileSync(`${blogFileDir}/${filename}.json`,'utf-8');

    res.status(200);
    res.json({ data: JSON.parse(data) });
    res.end();
  } catch (err) {
    res.status(500);
    res.json({ error: 'failed to read the blog file' });
    res.end();
  }
};

export default GetBlogFile;
