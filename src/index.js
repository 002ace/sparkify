const  express =  require("express");
const dbConnect =  require("../src/config/dbConnect");
const cookiParser  =  require("cookie-parser");
const app = express();
app.use(express.json())
app.use(cookiParser())

const  createProfile  =  require("../src/routes/profileRoute");
const login =  require("../src/routes/profileRoute");
const auth  =  require("../src/routes/profileRoute");
app.use('/api' ,  createProfile );

app.use("/api" , login);

app.use("/api" , auth);












dbConnect();



app.listen(4000 , ()=>{
       console.log("server is started ")
})






