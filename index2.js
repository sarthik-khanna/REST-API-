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
    // always make x custom header
res.setHeader("X-myName","sarthik khanna")
// console.log(req.headers)
    return res.json(users);
})

app.get("/api/users/:id",(req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id);
    if(!user) return res.status(404).json({error : "not found"});
    return res.json(user);
})
app.post("/api/users",(req,res)=>{

    const body=req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({msg : "All field are required"});
    }
    // console.log("body",body);
    users.push({...body,id:users.length+1})
fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
    return res.status(201). json({status:"success",id:users.length})
})
})

app.listen(port,()=>`server started at port ${port}`);