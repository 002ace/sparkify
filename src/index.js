const  express =  require("express");
const dbConnect =  require("../src/config/dbConnect");
const cookiParser  =  require("cookie-parser");
const app = express();
app.use(express.json())
app.use(cookiParser())

const  signup  =  require("../src/routes/authRoutes")
const  login = require("../src/routes/authRoutes")
const  logout =  require("../src/routes/authRoutes")
 
app.use('/api' , signup );

app.use("/api" , login);

app.use("/api" , logout);


//profile

const getprofile =  require("../src/routes/profileRoute");
const updateprofile = require("../src/routes/profileRoute");
app.use("/api" , getprofile);
app.use("/api" , updateprofile);


//connection

const connection =  require("../src/routes/connectionRoute");
app.use("/api" , connection);


 










dbConnect();



app.listen(4000 , ()=>{
       console.log("server is started ")
})






