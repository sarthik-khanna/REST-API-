const express=require("express");
const users=require("./MOCK_DATA.json");

const app=express();
const port =5000;

app.get("/users",(req,res)=>{
    const html=`
    <ul>
    ${users.map((users)=>`<li>${users.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})
// REST API


app.get("/api/users",(req,res)=>{
    return res.json(users);
})


// app.get("/api/users/:id",(req,res)=>{
//     const id=Number(req.params.id);
//     const user=users.find((user)=>user.id===id);
//     return res.json(user);

// })


app.route("/api/users/:id")
.get((req,res)=>{
const id=Number(req.params.id);
const user=users.find((user)=>user.id===users)
return res.json(user);
})
.delete((req,res)=>{
    // delete the user id
    return res.json({status : "pending"})
}).patch((req,res)=>{
    return res.end({status : "pending"})
}).delete((req,res)=>{
    return res.end({status :"pending"})
})

app.listen(port,()=>{`server started at port${port}`})