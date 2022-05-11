const express = require("express");
require("./db/conn");
const User = require("./models/users");
const app = express();
const port = process.env.port || 3002;

app.use(express.json());

app.get("/users",async(req,res)=>{
    try{
        const usersData= await User.find();
        res.send(usersData);
        console.log(usersData);
    }catch(e){
        res.send(e);
    }
})

app.get("/users/:id",async(req, res) => {
  try{
    const _id=req.params.id;
    const userData =await User.findById(_id);
    if(!userData){
        return res.status(404).send();
    }else{
        res.send(userData);
    }
  }catch(e){
      res.status(404).send(e);
  }
    res.send("Hello");
});


app.post("/users",async(req,res)=>{
    try{

        const user = new User(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }catch(e){
        res.status(400).send(e);
    }
})
app.patch("/users/:id",async(req,res)=>{
    try{
        const _id= req.params.id;
        const updateUser = await User.findByIdAndUpdate(_id,req.body,{new:true});
        res.send(updateUser);  
        console.log(updateUser);
    }catch(e){
        res.send(e);
    }
})

app.delete("/users/:id",async(req,res)=>{
    try{
    // const _id=req.params.id;
    const deleteData = await User.findByIdAndDelete(req.params.id)
    if(!req.params.id){
        return res.status(400).send()
    }
    res.send(deleteData);
    }catch(e){
        res.status(500).send(e);
    }
})

app.listen(port, () => {
  console.log(`server is running on  ${port}`);
});
