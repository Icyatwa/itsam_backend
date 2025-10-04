import database from "../backend/database.js";

const GetAuthorInfo = async (req,res,next)=>{
    try{
        const {authorid} = req.params
        
        const authorInfo = await database`
        select id,fullname,imageurl from admins where id=${authorid}
        `

        res.status(200)
        res.json({'data':authorInfo})
        res.end()
    }catch(err){
        res.status(500)
        res.json({'error':'failed to get blog posts','message':'failed to get blog posts from the database'})
        res.end()
    }
}

export default GetAuthorInfo