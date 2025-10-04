import path from "path"
import { readFile, rmSync } from "fs"

const GetImage = (req,res) => {
    const {category, imageid} = req.params

    const __dirname = path.resolve();
    const imagesRootFolder = path.join(__dirname, "images");

    try{
        const imageFile = `${imagesRootFolder}/${category}/${imageid}.jpg`

        readFile(imageFile,(err,data)=>{
            if(err){
                res.status(500)
                res.json({err:"some error happened while reading the file",mesasge:err})
                res.end()
                return
            }
            res.status(200)
            res.setHeader("Content-Type","image/jpg")
            res.send(data)
            res.end()
        })
    }catch(err){
        res.status(500)
        res.json({error:"failed to get the requested image",message:err})
        res.end()
    }
}

export default GetImage