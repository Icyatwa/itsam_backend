// importing and configuring the environmental variables
import "dotenv/config";
// importing the express module to use for the server
import express from "express";
// importing multer for form parsing 
import multer from "multer";
// importing cors middleware 
import cors from "cors"
// importing the database connection
import database from "./backend/database.js";

// getting the port for server to listen to
const PORT = process.env.PORT;

// importing the middlewares
import Authenticate from "./middlewares/Authentication.js";
import Getkey from "./middlewares/Getkey.js";

// importing the products middleware 
import GetProducts from "./middlewares/Getproducts.js";
import GetProduct from "./middlewares/GetProduct.js";
import AddProduct from "./middlewares/AddProduct.js";
import DeleteProduct from "./middlewares/DeleteProduct.js";
import UpdateProduct from "./middlewares/UpdateProduct.js";

import InsertOrder from "./middlewares/InsertOrder.js";
import GetFaqs from "./middlewares/GetFaqs.js";
import GetBlogs from "./middlewares/GetBlogs.js";
import GetReviews from "./middlewares/GetReviews.js";
import AddMessage from "./middlewares/AddMessage.js";
import GetCompanies from "./middlewares/GetCompanies.js";
import GetBlogPost from "./middlewares/GetBlogPost.js";
import GetBlogFile from "./middlewares/GetBlogFile.js";
import Login from "./middlewares/Login.js";
import GetMessages from "./middlewares/GetMessages.js";
import GetMessage from "./middlewares/GetMessage.js";
import DeleteMessage from "./middlewares/DeleteMessage.js";
import GetReview from "./middlewares/GetReview.js";
import DeleteReview from "./middlewares/DeleteReview.js"
import AddReview from "./middlewares/AddReview.js";
import UpdateReview from "./middlewares/UpdateReview.js";
import GetCompany from "./middlewares/GetCompany.js";
import UpdateCompany from "./middlewares/UpdateCompany.js";
import AddCompany from "./middlewares/AddCompany.js";
import DeleteCompany from "./middlewares/DeleteCompany.js";
import GetFaq from "./middlewares/GetFaq.js";
import AddFaq from "./middlewares/AddFaq.js";
import DeleteFaq from "./middlewares/DeleteFaq.js";
import UpdateFaq from "./middlewares/UpdateFaq.js";
import GetAdmins from "./middlewares/GetAdmins.js";
import GetAdmin from "./middlewares/GetAdmin.js";
import AddAdmin from "./middlewares/AddAdmin.js";
import DeleteAdmin from "./middlewares/DeleteAdmin.js";
import UpdateAdmin from "./middlewares/UpdateAdmin.js";
import MakeSuperUser from "./middlewares/MakeSuperUser.js";
import UpdatePassword from "./middlewares/UpdatePassword.js";
import UpdateProfile from "./middlewares/UpdateProfile.js";
import DeleteBlog from "./middlewares/DeleteBlog.js";
import AddBlog from "./middlewares/AddBlog.js";
import GetImage from "./middlewares/GetImage.js";
import * as paypal from "./middlewares/Paypal.js"
import bodyParser from "body-parser";
import GetAuthorBlogs from "./middlewares/GetAuthorBlogs.js";
import GetAuthorInfo from "./middlewares/GetAuthorInfo.js";
import GetOrders from "./middlewares/GetOrders.js";
import UpdateOrder from "./middlewares/UpdateOrder.js";
import GetReport from "./middlewares/GetReport.js";
import DownloadReport from "./middlewares/DownloadReport.js";
import getOrderAmount from "./middlewares/getOrderAmount.js";

// json body parser 
const parser = bodyParser.json()

// initializing the express server
const app = express();
app.use(express.json())
// using the cors middleware 
const corsOptions = {
  origin: ['http://localhost:5173','http://localhost:5174','http://localhost:4173','http://localhost:4174','http://localhost:4175','http://localhost:4176','http://localhost:4177','http://localhost:4178','http://localhost:5001'],//(https://your-client-app.com)
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions))
// initializing multer middleware 
const upload = multer()

app.get("/", Authenticate, (req, res) => {
  res.json({ message: "response sent", bodycontent: req.body }).status(200);
});

app.get("/keys", Getkey);

// products routes 
app.get("/products", Authenticate, GetProducts);
app.get("/products/:productid", Authenticate, GetProduct)
app.patch("/product/:productid", Authenticate, upload.any(), UpdateProduct)
app.post("/products", Authenticate, upload.any(), AddProduct);
app.delete("/products/:productid", Authenticate, DeleteProduct)

// messages routes 
app.get("/messages", Authenticate, GetMessages)
app.get("/messages/:messageid", Authenticate, GetMessage)
app.post("/messages", Authenticate,upload.none(), AddMessage)
app.delete("/messages/:messageid", Authenticate, DeleteMessage)

// reviews routes 
app.get('/reviews', Authenticate, GetReviews)
app.get("/reviews/:reviewid", Authenticate, GetReview)
app.patch("/reviews/:reviewid", Authenticate, upload.any(), UpdateReview)
app.post("/reviews", Authenticate, upload.any(), AddReview);
app.delete("/reviews/:reviewid", Authenticate, DeleteReview)

// companies routes 
app.get('/companies', Authenticate, GetCompanies)
app.get("/companies/:companyid", Authenticate, GetCompany)
app.patch("/companies/:companyid", Authenticate, upload.any(), UpdateCompany)
app.post("/companies", Authenticate, upload.any(), AddCompany);
app.delete("/companies/:companyid", Authenticate, DeleteCompany)

// faqs routes 
app.get("/faqs", Authenticate, GetFaqs)
app.get("/faqs/:faqid", Authenticate, GetFaq)
app.patch("/faqs/:faqid", Authenticate, upload.none(), UpdateFaq)
app.post("/faqs", Authenticate, upload.none(), AddFaq);
app.delete("/faqs/:faqid", Authenticate, DeleteFaq)

// admins routes 
app.get("/admins", Authenticate, GetAdmins)
app.get("/admins/:adminid", Authenticate, GetAdmin)
app.patch("/admins/:adminid", Authenticate, upload.any(), UpdateAdmin)
app.patch("/admins/password/:adminid", Authenticate, upload.none(), UpdatePassword)
app.patch("/admins/profile/:adminid", Authenticate, upload.any(), UpdateProfile)
app.patch("/admins/superuser/:adminid", Authenticate, upload.none(), MakeSuperUser)
app.post("/admins", Authenticate, upload.none(), AddAdmin);
app.delete("/admins/:adminid", Authenticate, upload.none(), DeleteAdmin)

// blogs routes 
app.get('/blogs', Authenticate, GetBlogs)
app.post('/blogs', Authenticate, upload.any(), AddBlog)
app.get('/blog/:blogid', Authenticate, GetBlogPost)
app.get('/blogfile/:filename', Authenticate, GetBlogFile)
app.delete('/blog/:blogid', Authenticate, DeleteBlog)

// author routes
app.get('/author/:authorid', Authenticate, GetAuthorBlogs)
app.get('/authorinfo/:authorid', Authenticate, GetAuthorInfo)

// orders routes 
app.post('/myOrder', Authenticate, upload.none(), InsertOrder)
app.get('/myOrder', Authenticate, upload.none(), GetOrders)
app.patch('/myOrder/:orderid', upload.none(), UpdateOrder)
app.get("/orderAmount/:ordercode",getOrderAmount)

// reports 
app.post('/report', Authenticate, upload.none(), GetReport)
app.get('/report/:reportid', upload.none(), DownloadReport)

// images routes 
app.get("/images/:category/:imageid",GetImage)


// paypal payment gateway routes 

// create order
app.post("/orders",Authenticate,parser, async (req, res) => {
  const order = await paypal.createOrder(req.body.paymentSource,req.body.purchaseCode);
  res.json(order);
});

// capture payment
app.post("/orders/:orderID/capture", async (req, res) => {
  const { orderID } = req.params;
  const captureData = await paypal.capturePayment(orderID);
  res.json(captureData);
});


app.post('/login', Authenticate, upload.none(), Login)

// server listening for requests on port
app.listen(PORT, console.log(`server started listening on port ${PORT}`));
