import database from "../backend/database.js";

const GetAuthorBlogs = async (req,res,next)=>{
    try{
        const {authorid} = req.params
        
        const blogposts = await database`
        select id,title,author,date from blogs where author=${authorid} order by date
        `

        res.status(200)
        res.json({'data':blogposts})
        res.end()
    }catch(err){
        res.status(500)
        res.json({'error':'failed to get blog posts','message':'failed to get blog posts from the database'})
        res.end()
    }
}

export default GetAuthorBlogs