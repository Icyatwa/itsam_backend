// importing the database 
import database from "../backend/database.js";

// middleware for getting the log posts 
const GetBlogPost = async(req,res,next)=>{
    // getting the blog id from the request url 
    const blogid = req.params.blogid

    try{
        const data = await database`
        select * from blogs where id=${blogid}
        `

        res.status(200)
        res.json({'data':data})
        res.end()
    }catch(err){
        res.status(500)
        res.json({'error':'failed to get blog post','message':'something happened on our end'})
        req.end()
    }
}

export default GetBlogPost