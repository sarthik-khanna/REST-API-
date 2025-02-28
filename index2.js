const express=require("express");
const users = require("./MOCK_DATA.json")
const fs=require("fs")
const app=express();

const port =8001;

//middleware

app.use(express.urlencoded({extended:false}));

app.use((req,res,next)=>{
    console.log("hello from middleware");
    req.myUsername="khanna app dev"
    // return res.json({msg:"hello from middle ware one"});
    next();
})

//second middleware

app.use((req,res,next)=>{
    console.log("hello from middleware 2",req.myUsername);
    // return res.end("hey");
    next();
    
})
// using fs module 
app.use((req,res,next)=>{
    fs.appendFile("log.txt",`${Date.now()}: ${req.method} : ${req.path}\n`,(err,data)=>{
        next();
    })
})

app.get("/users",(req,res)=>{
    const html=`
    <ul>
    ${users.map((users)=>`<li>${users.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})

app.get("/api/users",(req,res)=>{
    console.log("i am route api",req.myUsername)
    return res.json(users);
})

app.get("/api/users/:id",(req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id);
    return res.json(user);
})
app.post("/api/users",(req,res)=>{

    const body=req.body;
    // console.log("body",body);
    users.push({...body,id:users.length+1})
fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
    return res.json({status:"success",id:users.length})
})
})

app.listen(port,()=>`server started at port ${port}`);