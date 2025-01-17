const  express =  require("express");
const dbConnect =  require("../src/config/dbConnect");
const cookiParser  =  require("cookie-parser");
const cors  =  require("cors")
const app = express();
app.use(cors({
       origin:  true,
       credentials :true

}))
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

const accepteOrReject =  require("../src/routes/connectionRoute");
app.use("/api" , connection);
app.use("/api", accepteOrReject)


//user

const freindlist  =  require("../src/routes/userRoutes");
const  feedapi =  require("../src/routes/userRoutes");
const requestreceived =  require("../src/routes/userRoutes");

app.use("/api" , freindlist);
app.use("/api" , feedapi);
app.use("/api" , requestreceived);


 










dbConnect();



app.listen(4000 , ()=>{
       console.log("server is started ")
})






